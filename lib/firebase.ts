import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzvJQ5NWWaZ-ZRBLN201oaxlICgUgfTuQ",
  authDomain: "future-ecommerce-app.firebaseapp.com",
  projectId: "future-ecommerce-app",
  // Corrected storageBucket domain
  storageBucket: "future-ecommerce-app.appspot.com", 
  messagingSenderId: "144002140217",
  appId: "1:144002140217:web:a18510182518b77f8a25e8",
  measurementId: "G-QZT5LKBJXM"
};

// Initialize Firebase App
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// New function to get the client-side Auth instance
const getClientAuth = (): Auth => {
  return getAuth(app);
};

// Export the app, db, and the new function
export { app, db, getClientAuth };

