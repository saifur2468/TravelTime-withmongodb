// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWpNiZdTsVH3JZNVDyCZ5DRUw7-BDLj7Q",
  authDomain: "tourists-spot-60199.firebaseapp.com",
  projectId: "tourists-spot-60199",
  storageBucket: "tourists-spot-60199.firebasestorage.app",
  messagingSenderId: "746232898733",
  appId: "1:746232898733:web:332b4a795374bbcc8cd224",
  measurementId: "G-TJ7KYCT5GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();