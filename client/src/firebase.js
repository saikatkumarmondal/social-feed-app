import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB3fkNl-9aPFfBdKBmCoNMauTuLNUbSARM",
  authDomain: "social-app-official.firebaseapp.com",
  projectId: "social-app-official",
  storageBucket: "social-app-official.firebasestorage.app",
  messagingSenderId: "41879433609",
  appId: "1:41879433609:web:53bd9f43954e8a0b92b158",
  measurementId: "G-X5KRTP5RHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ IMPORTANT
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();