import { Events } from "../../enums/event/event.enum.js";
import { userCallMap, userSocketIds } from "../../index.js";
import { prisma } from "../../lib/prisma.lib.js";
import { sendPushNotification } from "../../utils/generic.js";
const registerWebRtcHandlers = (socket, io) => {
    socket.on(Events.CALL_USER, async ({ calleeId, offer }) => {
        try {
            console.log('call user event received from', socket.user.username);
            // setting the caller as busy so that while caller is calling somebody else, he can't be called
            userCallMap.set(socket.user.id, true);
            const isCalleeBusy = userCallMap.get(calleeId);
            // if(isCalleeBusy){
            //     console.log('busyyyyyyyyy');
            //     await prisma.callHistory.create({
            //         data:{
            //             callerId:socket.user.id,
            //             calleeId:calleeId,
            //             status:"MISSED"
            //         }
            //     })
            //     socket.emit(Events.CALLEE_BUSY);
            //     socket.emit(Events.CALL_END);
            //     const calleeInfo =  await prisma.user.findUnique({
            //         where:{id:calleeId},
            //         select:{notificationsEnabled:true,fcmToken:true}
            //     });
            //     if(calleeInfo && calleeInfo.notificationsEnabled && calleeInfo.fcmToken){
            //         sendPushNotification({fcmToken:calleeInfo.fcmToken,body:`You have missed a call from ${socket.user.username}`,title:"Missed Call"})
            //     }
            //     userCallMap.delete(socket.user.id); // making the caller available again
            //     return;
            // }
            const calleeSocketId = userSocketIds.get(calleeId);
            if (!calleeSocketId) {
                socket.emit(Events.CALLEE_OFFLINE);
                socket.emit(Events.CALL_END);
                await prisma.callHistory.create({
                    data: {
                        callerId: socket.user.id,
                        calleeId: calleeId,
                        status: "MISSED"
                    }
                });
                const calleeInfo = await prisma.user.findUnique({
                    where: { id: calleeId },
                    select: { notificationsEnabled: true, fcmToken: true }
                });
                if (calleeInfo && calleeInfo.notificationsEnabled && calleeInfo.fcmToken) {
                    sendPushNotification({ fcmToken: calleeInfo.fcmToken, body: `You have missed a call from ${socket.user.username}`, title: "Missed Call" });
                }
                userCallMap.delete(socket.user.id); // making the caller available again
                console.log('Callee is offline');
                return;
            }
            // setting the callee as busy, so that he can't be called by anybody else while he is in a call or being called
            userCallMap.set(calleeId, true);
            const newCall = await prisma.callHistory.create({
                data: {
                    callerId: socket.user.id,
                    calleeId: calleeId,
                }
            });
            const payload = {
                caller: {
                    id: socket.user.id,
                    username: socket.user.username,
                    avatar: socket.user.avatar
                },
                offer,
                callHistoryId: newCall.id
            };
            console.log('emitting incoming call event to', calleeSocketId);
            io.to(calleeSocketId).emit(Events.INCOMING_CALL, payload);
        }
        catch (error) {
            console.log('Error in CALL_USER event', error);
            userCallMap.delete(socket.user.id); // making the caller available again
            socket.emit(Events.CALL_END);
        }
    });
    socket.on(Events.CALL_ACCEPTED, async ({ answer, callerId, callHistoryId }) => {
        try {
            const callerSocketId = userSocketIds.get(callerId);
            if (!callerSocketId) { // caller went offline
                // so we need to update the call status and free both caller and callee from busy list
                const call = await prisma.callHistory.findUnique({ where: { id: callHistoryId } });
                if (!call) {
                    console.log('Some Error occured');
                    return;
                }
                await prisma.callHistory.update({
                    where: { id: callHistoryId },
                    data: {
                        status: "MISSED",
                    }
                });
                // making the callee,caller available again
                userCallMap.delete(call.calleeId);
                userCallMap.delete(call.callerId);
                const calleeSocketId = userSocketIds.get(call.calleeId);
                if (calleeSocketId) {
                    io.to(calleeSocketId).emit(Events.CALL_END);
                    io.to(calleeSocketId).emit(Events.CALLER_OFFLINE);
                }
                return;
            }
            const payload = {
                calleeId: socket.user.id,
                answer,
                callHistoryId
            };
            socket.to(callerSocketId).emit(Events.CALL_ACCEPTED, payload);
        }
        catch (error) {
            console.log('Error in CALL_ACCEPTED event', error);
        }
    });
    socket.on(Events.CALL_REJECTED, async ({ callHistoryId }) => {
        const call = await prisma.callHistory.findUnique({
            where: { id: callHistoryId }
        });
        try {
            if (!call) {
                console.log(`Call not found for callHistoryId: ${callHistoryId}`);
                return;
            }
            const updatedCall = await prisma.callHistory.update({
                where: { id: call.id },
                data: { status: "REJECTED" }
            });
            const callerSocketId = userSocketIds.get(updatedCall.callerId);
            const calleeSocketId = userSocketIds.get(updatedCall.calleeId);
            if (callerSocketId) {
                socket.to(callerSocketId).emit(Events.CALL_REJECTED);
                socket.to(callerSocketId).emit(Events.CALL_END);
            }
            if (calleeSocketId) {
                io.to(calleeSocketId).emit(Events.CALL_END);
            }
        }
        catch (error) {
            console.log('Error in CALL_REJECTED event', error);
        }
        finally {
            // making the callee available again
            // removing the callee from the busy list
            if (call?.calleeId) {
                userCallMap.delete(call.calleeId);
            }
            // making the caller available again
            // removing the caller from the busy list
            if (call?.callerId) {
                userCallMap.delete(call.callerId);
            }
        }
    });
    socket.on(Events.CALL_END, async ({ callHistoryId }) => {
        try {
            const ongoingCall = await prisma.callHistory.findUnique({ where: { id: callHistoryId } });
            if (!ongoingCall) {
                console.log(`Ongoing call not found for callHistoryId: ${callHistoryId}`);
                return;
            }
            await prisma.callHistory.update({
                where: { id: ongoingCall.id },
                data: {
                    endedAt: new Date(),
                    duration: Math.floor((new Date().getTime() - ongoingCall.startedAt.getTime()) / 1000),
                    status: "COMPLETED"
                }
            });
            const callerSocketId = userSocketIds.get(ongoingCall.callerId);
            const calleeSocketId = userSocketIds.get(ongoingCall.calleeId);
            // and freeing both caller and callee from busy list
            userCallMap.delete(ongoingCall.callerId);
            userCallMap.delete(ongoingCall.calleeId);
            if (callerSocketId) {
                io.to(callerSocketId).emit(Events.CALL_END);
            }
            if (calleeSocketId) {
                io.to(calleeSocketId).emit(Events.CALL_END);
            }
        }
        catch (error) {
            console.error(`Error in CALL_END event for callHistoryId: ${callHistoryId}`, error);
        }
    });
    socket.on(Events.NEGO_NEEDED, async ({ offer, calleeId, callHistoryId }) => {
        try {
            const calleeSocketId = userSocketIds.get(calleeId);
            if (!calleeSocketId) {
                // so we need to update the call status and free both caller and callee from busy list
                const call = await prisma.callHistory.findUnique({ where: { id: callHistoryId } });
                if (!call) {
                    console.error(`Call history not found for callHistoryId: ${callHistoryId}`);
                    return;
                }
                await prisma.$transaction([
                    prisma.callHistory.update({
                        where: { id: callHistoryId },
                        data: { status: "MISSED" }
                    })
                ]);
                // making the callee,caller available again
                userCallMap.delete(call.calleeId);
                userCallMap.delete(call.callerId);
                const callerSocketId = userSocketIds.get(call.callerId);
                if (callerSocketId) {
                    io.to(callerSocketId).emit(Events.CALLEE_OFFLINE);
                    io.to(callerSocketId).emit(Events.CALL_END);
                }
                return;
            }
            const payload = {
                offer,
                callerId: socket.user.id,
                callHistoryId
            };
            socket.to(calleeSocketId).emit(Events.NEGO_NEEDED, payload);
        }
        catch (error) {
            console.log('Error in NEGO_NEEDED event', error);
        }
    });
    socket.on(Events.NEGO_DONE, async ({ answer, callerId, callHistoryId }) => {
        try {
            const callerSocketId = userSocketIds.get(callerId);
            if (!callerSocketId) {
                // so we need to update the call status and free both caller and callee from busy list
                const call = await prisma.callHistory.findUnique({ where: { id: callHistoryId } });
                if (!call) {
                    console.warn(`Call history not found or already updated for callHistoryId: ${callHistoryId}`);
                    return;
                }
                await prisma.$transaction([
                    prisma.callHistory.update({
                        where: { id: callHistoryId },
                        data: { status: "MISSED" }
                    })
                ]);
                // making the callee,caller available again
                userCallMap.delete(call.calleeId);
                userCallMap.delete(call.callerId);
                const calleeSocketId = userSocketIds.get(call.calleeId);
                if (calleeSocketId) {
                    io.to(calleeSocketId).emit(Events.CALL_END);
                    io.to(calleeSocketId).emit(Events.CALLER_OFFLINE);
                }
                return;
            }
            const payload = {
                answer,
                calleeId: socket.user.id
            };
            socket.to(callerSocketId).emit(Events.NEGO_FINAL, payload);
        }
        catch (error) {
            console.log('Error in NEGO_DONE event', error);
        }
    });
};
export default registerWebRtcHandlers;
