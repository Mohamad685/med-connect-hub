// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

const messaging = getMessaging();
getToken(messaging, {vapidKey: "BN8h0qLxpg6hYB0kiZSzpLrjQPsfpTinxuhw653tMMNt90Np9im2rEzzit0BBykTnaCvdSW9D6UEI3juJmfmRIw"}).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

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