import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9s29-d2KR8gDP6nCnR71e37lF_zWb8QU",
  authDomain: "dummy-shop-eaac0.firebaseapp.com",
  projectId: "dummy-shop-eaac0",
  storageBucket: "dummy-shop-eaac0.firebasestorage.app",
  messagingSenderId: "939015405466",
  appId: "1:939015405466:web:588f12495ecb52e892c423"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);