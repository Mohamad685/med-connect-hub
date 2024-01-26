import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDazaPi2lgPM_pcHEaRe_uuz2JgAk1cxX4",
  authDomain: "med-hub-new.firebaseapp.com",
  projectId: "med-hub-new",
  storageBucket: "med-hub-new.appspot.com",
  messagingSenderId: "630261503793",
  appId: "1:630261503793:web:df27b810171f787d7a8210"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default db;
