# Personal Gemini Journal 📖✨

> A user-authenticated personal journaling and reflection web application powered by **Google Gemini Flash**, **Firebase Authentication (Google Sign-In)**, and **Cloud Firestore** with strict per-user data isolation.

---

## 🌟 Key Features & User Flow

1. **Authentication & Identity**:
   - Secure login via **Google Sign-In** powered by Firebase Authentication.
   - Zero storage of raw passwords or personal credential databases.
   - Built-in preview/demo mode for rapid local testing.

2. **Strict User-Isolated Cloud Firestore**:
   - All reflections and dialogue history are strictly scoped under `/users/{auth.uid}/journals/...`.
   - Firestore security rules guarantee that different users cannot query, read, or alter each other's entries.

3. **Empathetic AI Journaling Companion (Gemini Flash)**:
   - Multi-turn conversational journaling powered by `@google/genai`.
   - Intelligent persona switching:
     - **Reflective Companion**: Validates emotions, mirrors feelings, and offers gentle follow-up questions.
     - **Executive Analyst**: Provides structured summaries and emotional tone assessments.
     - **Brainstorm Partner**: Generates creative angles and fresh perspectives on life dilemmas.
     - **Socratic Guide**: Challenges cognitive habits and asks deep self-discovery questions.

4. **Structured Executive Summarization**:
   - One-click synthesis extracting an executive overview, emotional tone, core insights, and actionable micro-steps.

5. **Journal History & Search**:
   - Realtime synchronized sidebar listing past reflections.
   - Instant search by title or keyword.

---

## 🏗️ Architecture & Tech Stack

| Component | Technology | Role & Security |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router) + React 19 + TypeScript | Full-stack web application |
| **Styling** | Tailwind CSS + Lucide Icons | Serene, responsive, distraction-free journaling UI |
| **User Identity** | Firebase Authentication (Google Sign-In) | Client-side OAuth flow with ID token verification |
| **Backend Database** | Cloud Firestore | Isolated document storage (`users/{uid}/journals/{id}`) |
| **AI Engine** | Google Gemini Flash API (`@google/genai`) | Server-side API endpoints (`/api/gemini/chat`, `/api/gemini/summarize`) |
| **Secret Management** | Server Environment Variables (`.env.local`) | Protects `GEMINI_API_KEY` away from client browser |

---

## 🔒 Firestore Security Rules

To enforce strict per-user isolation where **no user can read or write anyone else's reflections**, deploy `firestore.rules`:

```rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Strict Per-User Isolation
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 🚀 Setup Guide

### 1. Obtain a Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Click **Create API Key**.
3. Copy your key.

### 2. Set Up Firebase
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a project.
2. **Enable Authentication**:
   - Go to **Build** > **Authentication** > **Get Started**.
   - Under the **Sign-in method** tab, click **Google** and toggle **Enable**.
   - Set your project support email and save.
3. **Enable Cloud Firestore**:
   - Go to **Build** > **Firestore Database** > **Create database**.
   - Choose a location and start in **Production mode** (or standard mode).
   - In the **Rules** tab, paste the rules from `firestore.rules` above and click **Publish**.
4. **Register a Web App**:
   - In Project Settings (gear icon), click **Add app** > **Web** (`</>`).
   - Register the app and copy the `firebaseConfig` object credentials.

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your keys:

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
# Gemini API Key (Server-side secret)
GEMINI_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-2.5-flash

# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef
```

### 4. Run Locally

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Deployment & Verification

### Build for Production:
```bash
npm run build
npm run start
```

### Deploying Firestore Rules:
If you have the Firebase CLI logged in:
```bash
npx firebase-tools deploy --only firestore:rules
```
Or simply paste `firestore.rules` directly into the Firebase Console Rules editor and click **Publish**.
