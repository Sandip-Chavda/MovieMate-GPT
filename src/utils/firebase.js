// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "moviemate-90677.firebaseapp.com",
  projectId: "moviemate-90677",
  storageBucket: "moviemate-90677.appspot.com",
  messagingSenderId: "539913639374",
  appId: process.env.REACT_APP_FIREBASE_API_ID,
  measurementId: "G-FWXCG7FT8C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
