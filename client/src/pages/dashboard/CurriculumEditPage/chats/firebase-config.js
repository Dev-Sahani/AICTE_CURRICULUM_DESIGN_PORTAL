// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB-_p1uajTgPrt5dxSwPeOjrif-XbfMzKQ",
  authDomain: "curriculum-chat.firebaseapp.com",
  projectId: "curriculum-chat",
  storageBucket: "curriculum-chat.appspot.com",
  messagingSenderId: "132599726890",
  appId: "1:132599726890:web:3a5926eb721f168827d453"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();