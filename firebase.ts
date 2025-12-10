// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2WKGEXfyJd4zwUMGogLI_l2YRyqNCE7Q",
  authDomain: "comagend-abb03.firebaseapp.com",
  projectId: "comagend-abb03",
  storageBucket: "comagend-abb03.firebasestorage.app",
  messagingSenderId: "688562858876",
  appId: "1:688562858876:web:7bcfd07613dd952b8592f9",
  measurementId: "G-72796KHVQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);