// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQenHzuzipbpbbk_UXXWJmK03qn-rTaYM",
  authDomain: "newu-e0a97.firebaseapp.com",
  projectId: "newu-e0a97",
  storageBucket: "newu-e0a97.appspot.com",
  messagingSenderId: "68196894000",
  appId: "1:68196894000:web:1ab355befbc05a41c434f5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
