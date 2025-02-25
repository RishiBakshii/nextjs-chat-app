# **Mernchat – Secure, End-to-End Encrypted (E2EE) Real-Time Messaging** 🗨️  

**[Mernchat](https://mernchat.in)** is a **secure, real-time messaging platform** built with **Next.js 15, Socket.IO, and end-to-end encryption (E2EE)** to ensure **privacy-first communication**. Designed for seamless **group chats, reactions, file sharing, and OAuth login**, this app is the perfect solution for **secure online conversations**.

![Next.js-chat-app Screenshot](next-js-frontend/public/images/og/og-image.png)
![Next.js-chat-app Screenshot](next-js-frontend/public/images/dekstop-screenshots/group-chat-creation.png)  
![Next.js-chat-app Screenshot](next-js-frontend/public/images/dekstop-screenshots/recent-calls.png)
![Next.js-chat-app Screenshot](next-js-frontend/public/images/dekstop-screenshots/poll-creation.png)  
![Next.js-chat-app Screenshot](next-js-frontend/public/images/dekstop-screenshots/sending-gif.png)  
![Next.js-chat-app Screenshot](next-js-frontend/public/images/dekstop-screenshots/uploading-attachments.png)


<!-- ## **Responsive Design 📱**

<div>
<img style="object-fit: contain;" src="next-js-frontend/public/images/mobile-screenshots/home-screen.png"/>
<img style="object-fit: contain;" src="next-js-frontend/public/images/mobile-screenshots/call-history.png"/>
<img style="object-fit: contain;" src="next-js-frontend/public/images/mobile-screenshots/incoming-call.png"/>
<img style="object-fit: contain;" src="next-js-frontend/public/images/mobile-screenshots/ongoing-call.png"/>
<img style="object-fit: contain;" src="next-js-frontend/public/images/mobile-screenshots/chat-view.png"/>
<img style="object-fit: contain;" src="next-js-frontend/public/images/mobile-screenshots/reaction-and-unsend-feature.png"/>
<img style="object-fit: contain;" src="next-js-frontend/public/images/mobile-screenshots/add-caption-on-photo.png"/>
<img style="object-fit: contain;" src="next-js-frontend/public/images/mobile-screenshots/chat-details.png"/>
</div>


--- -->
---
## 🔐 Privacy & Encryption Commitment  

At this project [Mernchat](https://mernchat.in), i have taken **privacy and security** seriously. The app is **built, designed, and structured** with user privacy in mind, ensuring that **certain messages remain completely inaccessible—even to me as a developer**.  

### **End-to-End Encryption (E2EE)**  
Private **one-on-one text messages and voice notes** are **end-to-end encrypted** using **AES-256-GCM + ECDH**. This means:  

✅ **No one—including me as the developer—can access your private chats or private voice notes.**  
✅ **Text messages sent in private chats (between two users) and voice notes sent in private chats (between two users) are encrypted at the sender’s device and only decrypted on the recipient’s device.**  
✅ **Even if I access the database directly, I cannot read or retrieve private messages or private voice notes in plain text/data**  

For **full transparency**, here’s a snapshot of how private messages and private voice notes are stored in the database—fully encrypted and unreadable to anyone, including myself.  

### This is how your private chat text messages that are e2ee looks like in database
![](next-js-frontend/public/images/privacy/e2ee-messages-in-database.png)

### This is how your private chat voice notes that are also e2ee looks like

##### Here each file in this folder `encrypted-audio` represents a single e2ee voice note
![](next-js-frontend/public/images/privacy/encrypted-audio-cloudinary-folder.png)
##### And this is how your encrypted voice note data looks like
![](next-js-frontend/public/images/privacy/encrypted-voice-note-data.png)

### **What’s Not E2EE?**  
While all data is stored securely, end-to-end encryption is **only applied to private text messages and private voice notes**. The following are **not** end-to-end encrypted:  

❌ **Group chats**  
❌ **Audio & video calls (powered by webrtc)**  
❌ **Media files (images, videos, GIFs, documents, attachments, etc.)**  

These features are still securely transmitted and stored, but they do not follow the same encryption standard as private messages and private voice notes.  

At [Mernchat](https://mernchat.in), i am committed to transparency and security. As i continue improving, my aim is to enhance encryption features for even greater privacy in future updates.

---
## **🚀 Features**  

### 💬 **Chat & Messaging**  
- **Real-time Messaging** – Instantly send and receive messages.  
- **Voice Notes** – Record and send encrypted voice messages in private chats (not encrypted in group chats). 
- **Message Editing** – Edit messages after sending (with an edit indicator).  
- **Message Reactions** – React to messages with emojis (double-tap to like/unlike).  
- **Message Deletion** – Delete messages after sending.  
- **Typing Indicators** – See when someone is typing (supports multiple users typing simultaneously in group chats).  


### 📞 **Audio & Video Calling**
- **Peer-to-Peer Calls** – High-quality, voice and video calls (powered by Webrtc).
- **Call History** – View and manage past call logs.

### 📢 **Notifications & Presence**  
- **Push Notifications** – Stay updated with real-time alerts (powered by Firebase).  
- **User Presence** – See who’s online in real time.

### 🤝 **Social Features**  
- **Friends System** – Add friends and chat with them.  
- **Group Chats** – Create and participate in group conversations.  
- **Polling** – Create polls with single/multiple voting options.  

### 📁 **Media & File Sharing**  
- **GIF Support** – Send animated GIFs (powered by Tenor).  
- **File Sharing** – Send and receive files securely.  

### 🔒 **Privacy & Security**  
- **End-to-End Encryption (E2EE)** – Secure messages with advanced encryption.  
- **Private Key Recovery** – Retrieve your encryption key with MFA-protected email verification.  

### 🛠️ **Other Features**  
- **OAuth Integration** – Sign in with Google & GitHub.  
- **PWA Support** – Install next-js-chat-app as a Progressive Web App for a native-like experience.  

---


## **Who Can Use This Chat App?**  

✔️ **Startups & Teams** – Secure & private team collaboration 🔐  
✔️ **Developers** – Learn how to build a **real-time chat app** 👨‍💻  
✔️ **Open-Source Enthusiasts** – Contribute & improve the project 🚀  
✔️ **Personal Use** – Chat privately with friends & family 💬  

---

## **🛠️ Tech Stack**  

### **Frontend**  
- **⚛️ Next.js 15 + React 19** – Modern full-stack React framework.  
- **🛠️ Redux Toolkit + React-Redux** – Efficient global state management.  
- **🔗 React Hook Form + Zod** – Form handling & schema validation.  
- **🔄 Socket.IO Client** – Real-time communication.  
- **📅 Date-fns** – Date & time utilities.  
- **🎥 Framer Motion + Lottie-React** – Animations & dynamic UI effects.  
- **🔥 Firebase** – Push notifications & backend integration.  
- **💅 Tailwind CSS** – Responsive & scalable UI.  
- **🚀 Nodemailer** – Email handling.  
- **🔐 bcryptjs + jose** – Authentication & encryption.  
- **💬 Emoji-Picker-React + Gif-Picker-React** – Interactive media in chat.  
- **🛠️ Prisma ORM** – Database management.  

### **Backend**  
- **🟢 Node.js + Express** – Scalable backend API.  
- **🔄 Socket.IO** – Real-time bidirectional communication.  
- **🗄️ Prisma ORM** – Type-safe database management.  
- **🔐 JWT Authentication (jsonwebtoken)** – Secure authentication.  
- **☁️ Cloudinary** – Cloud storage for images & files.  
- **📧 Nodemailer** – Email notifications & MFA verification.  
- **🔑 Passport.js + Google OAuth** – OAuth-based authentication.  
- **🔥 Firebase Admin SDK** – Push notifications.  
- **🛡️ Helmet** – Security headers for protection.  
- **📝 Morgan** – HTTP request logging.  
- **🍪 Cookie-Parser** – Secure cookie handling.  
- **🛠️ Multer** – File uploads.  
- **🔄 CORS** – Cross-origin requests.  
- **🛠️ UUID** – Unique ID generation.  
- **⚙️ dotenv** – Environment variable management.  

---

## **🚀 Getting Started**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/RishiBakshii/nextjs-chat-app
cd nextjs-chat-app
```

### **2️⃣ Set Up Environment Variables**  

#### **Backend Configuration**  
1. Navigate to the **backend** folder.  
2. Copy `.env.example` and rename it to `.env`.  
3. Replace the placeholder values with actual credentials.  
4. Make sure `backend/src/firebase-admin-cred.json` is correctly set up for Firebase authentication.  

📝 **Example (`backend/.env`)**:  
```ini
NODE_ENV=DEVELOPMENT
PORT=8000
JWT_SECRET=your-secure-jwt-secret
DATABASE_URL=your-database-url
FIREBASE_CREDENTIALS_PATH=./src/firebase-admin-cred.json
```

---

#### **Frontend Configuration**  
1. Navigate to the **frontend** folder.  
2. Copy `.env.development.example` and rename it to `.env.development`.  
3. Copy `.env.production.example` and rename it to `.env.production`.  
4. Fill in your API keys and URLs.  

📝 **Example (`frontend/.env.development`)**:  
```ini
NEXT_PUBLIC_TENOR_API_KEY=your-tenor-api-key
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
```

🚨 **Important Notes:**  
- Never expose sensitive credentials in `NEXT_PUBLIC_` variables.  
- Ensure the correct Firebase and API URLs are set.  

---

### **3️⃣ Install Dependencies & Run the Application**  

#### **Start the Backend First**  
```bash
cd backend
npm install
npm run dev
```
The backend will start at **http://localhost:8000**.  

---

#### **Then Start the Frontend**  
```bash
cd frontend
npm install
npm run dev
```
Visit **http://localhost:3000** in your browser.  

---

## **💡 Contribution Guide**  
Contributions are welcome! To contribute:  
1. **Fork** the repository.  
2. **Create a branch**:  
   ```bash
   git checkout -b feature-branch
   ```  
3. **Commit your changes**:  
   ```bash
   git commit -m "Add new feature"
   ```  
4. **Push to GitHub**:  
   ```bash
   git push origin feature-branch
   ```  
5. **Open a Pull Request** 🚀  

---

## **📧 Contact**  
For feedback or queries, reach out:  
📩 **[rishibakshiofficial@gmail.com](mailto:rishibakshiofficial@gmail.com)**  

---

![GitHub Repo stars](https://img.shields.io/github/stars/RishiBakshii/nextjs-chat-app?style=social)  
![GitHub forks](https://img.shields.io/github/forks/RishiBakshii/nextjs-chat-app?style=social)  
![GitHub issues](https://img.shields.io/github/issues/RishiBakshii/nextjs-chat-app)  
![GitHub license](https://img.shields.io/github/license/RishiBakshii/nextjs-chat-app)  
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)  

---