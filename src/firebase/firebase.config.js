import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAluvHcBRGXRjufWhEEzIEyZNNj9-c4SM",
  authDomain: "anibuba-5c0c9.firebaseapp.com",
  projectId: "anibuba-5c0c9",
  storageBucket: "anibuba-5c0c9.appspot.com",
  messagingSenderId: "274503169754",
  appId: "1:274503169754:web:41a507216fe15a497097e3",
  measurementId: "G-7SPPE2X2G2"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth()