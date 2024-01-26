import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDazaPi2lgPM_pcHEaRe_uuz2JgAk1cxX4",
  authDomain: "med-hub-new.firebaseapp.com",
  databaseURL: "https://med-hub-new-default-rtdb.firebaseio.com",
  projectId: "med-hub-new",
  storageBucket: "med-hub-new.appspot.com",
  messagingSenderId: "630261503793",
  appId: "1:630261503793:web:2e7bb974d729d9347a8210"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default db;
