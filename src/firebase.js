import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCcPGOYpaqyTcLrLLdLKNcn6OXOnISpP9E",
  authDomain: "rs-firebase-lessons.firebaseapp.com",
  projectId: "rs-firebase-lessons",
  storageBucket: "rs-firebase-lessons.firebasestorage.app",
  messagingSenderId: "283301180940",
  appId: "1:283301180940:web:0dfbe31746affd9a3f2029",
  databaseURL:
    "https://rs-firebase-lessons-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
