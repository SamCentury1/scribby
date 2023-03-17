// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnybJjvxMhroyu2ZpIXY51ieQBGfcY5s0",
    authDomain: "scribby-ed667.firebaseapp.com",
    projectId: "scribby-ed667",
    storageBucket: "scribby-ed667.appspot.com",
    messagingSenderId: "902545627174",
    appId: "1:902545627174:web:b4012914727f41e7e86ee7",
    measurementId: "G-ZMGRH40NSG"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)