// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClDBqdaluM8K06znAvALzX8dIlN9z7DOE", // Your Web API Key here
  authDomain: "pust-dormetory.firebaseapp.com",
  projectId: "pust-dormetory",
  storageBucket: "pust-dormetory.appspot.com",
  messagingSenderId: "952931314272",
  appId: "1:952931314272:web:abcd1234efgh5678", // Example appId
  measurementId: "G-XXXXXXX", // Optional for analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(app);

// Get Firestore instance
const db = getFirestore(app);  // Initialize Firestore

// Export both auth and db to use in other components
export { auth, db,collection,getDocs };
