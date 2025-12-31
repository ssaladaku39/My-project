import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBATDt1s383ikyOEPl4D5Ume-VgYbToW9Y",
  authDomain: "new-development-5bb41.firebaseapp.com",
  projectId: "new-development-5bb41",
  storageBucket: "new-development-5bb41.firebasestorage.app",
  messagingSenderId: "70141974932",
  appId: "1:70141974932:web:dafb63482c745078c61781",
  measurementId: "G-716RJ1W1LB"
};

// アプリの初期化
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 【重要】ここがエラーの原因です。必ず export を付けてください
export const db = getFirestore(app);
export const auth = getAuth(app);