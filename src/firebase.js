// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD144v5e3drXitUMQbSQFdYDKNSv60TDLw",
  authDomain: "precision-gym.firebaseapp.com",
  databaseURL: "https://precision-gym-default-rtdb.firebaseio.com",
  projectId: "precision-gym",
  storageBucket: "precision-gym.appspot.com",
  messagingSenderId: "129767049868",
  appId: "1:129767049868:web:b2c2816d947dc366bdc9a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
