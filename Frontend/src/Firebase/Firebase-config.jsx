// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBghEmngkBtymkrytVN6UDDZIWRwt7GPME",
  authDomain: "med-hub-d036e.firebaseapp.com",
  projectId: "med-hub-d036e",
  storageBucket: "med-hub-d036e.appspot.com",
  messagingSenderId: "872400202730",
  appId: "1:872400202730:web:56d5d89504c11f8ab12093",
  measurementId: "G-0B5LVMTMDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);