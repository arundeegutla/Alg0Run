import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyBZpIB_t37k8imEkstj9YDDrsZRitVW-6U",
    authDomain: "knight-hacks-2023.firebaseapp.com",
    projectId: "knight-hacks-2023",
    storageBucket: "knight-hacks-2023.appspot.com",
    messagingSenderId: "222283636237",
    appId: "1:222283636237:web:17302281333ea0769dff44"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();