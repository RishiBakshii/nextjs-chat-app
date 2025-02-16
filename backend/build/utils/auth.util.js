import { v2 as cloudinary } from 'cloudinary';
const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
// const cookieOptions:CookieOptions = {
//     maxAge:thirtyDaysInMilliseconds,
//     httpOnly:true,
//     path:"/",
//     priority:"high",
//     secure:true,
//     sameSite:env.NODE_ENV==='DEVELOPMENT'?"lax":"none",
//     domain: env.NODE_ENV === 'DEVELOPMENT' ? 'localhost' : 'aesehi.online',
//     partitioned:true,
// }
export const uploadFilesToCloudinary = async ({ files }) => {
    try {
        const uploadPromises = files.map(file => cloudinary.uploader.upload(file.path));
        const result = await Promise.all(uploadPromises);
        return result;
    }
    catch (error) {
        console.log('Error uploading files to cloudinary');
        console.log(error);
    }
};
export const deleteFilesFromCloudinary = async ({ publicIds }) => {
    try {
        await cloudinary.uploader.destroy(publicIds[0]);
        const deletePromises = publicIds.map(publicId => cloudinary.uploader.destroy(publicId));
        const uploadResult = await Promise.all(deletePromises);
        return uploadResult;
    }
    catch (error) {
        console.log('Error deleting files from cloudinary');
        console.log(error);
    }
};
export const getSecureUserInfo = (user) => {
    return {
        id: user._id,
        name: user.name,
        username: user.username,
        avatar: user.avatar?.secureUrl,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        verified: user.verified,
        publicKey: user?.publicKey,
        notificationsEnabled: user.notificationsEnabled,
        verificationBadge: user.verificationBadge,
        fcmTokenExists: user.fcmToken?.length ? true : false,
        oAuthSignup: user.oAuthSignup
    };
};
