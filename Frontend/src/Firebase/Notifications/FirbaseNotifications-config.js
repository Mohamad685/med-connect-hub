import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

    const firebaseConfig = {
        apiKey: "AIzaSyDazaPi2lgPM_pcHEaRe_uuz2JgAk1cxX4",
        authDomain: "med-hub-new.firebaseapp.com",
        databaseURL: "https://med-hub-new-default-rtdb.firebaseio.com",
        projectId: "med-hub-new",
        storageBucket: "med-hub-new.appspot.com",
        messagingSenderId: "630261503793",
        appId: "1:630261503793:web:3a1724ab08aa5a927a8210"}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = getMessaging(app);

export{messaging}
