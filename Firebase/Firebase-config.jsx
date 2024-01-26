// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDazaPi2lgPM_pcHEaRe_uuz2JgAk1cxX4",
  authDomain: "med-hub-new.firebaseapp.com",
  projectId: "med-hub-new",
  storageBucket: "med-hub-new.appspot.com",
  messagingSenderId: "630261503793",
  appId: "1:630261503793:web:df27b810171f787d7a8210"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
