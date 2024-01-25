import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBghEmngkBtymkrytVN6UDDZIWRwt7GPME",
  authDomain: "med-hub-d036e.firebaseapp.com",
  projectId: "med-hub-d036e",
  storageBucket: "med-hub-d036e.appspot.com",
  messagingSenderId: "872400202730",
  appId: "1:872400202730:web:56d5d89504c11f8ab12093",
  measurementId: "G-0B5LVMTMDM"};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

export {messaging, getToken};

