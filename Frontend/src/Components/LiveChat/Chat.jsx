import React, { useState } from "react";
import DoctorList from "./DoctorsList";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./Chat.css";

const firebaseConfig = {
	apiKey: "AIzaSyDazaPi2lgPM_pcHEaRe_uuz2JgAk1cxX4",
    authDomain: "med-hub-new.firebaseapp.com",
    databaseURL: "https://med-hub-new-default-rtdb.firebaseio.com",
    projectId: "med-hub-new",
    storageBucket: "med-hub-new.appspot.com",
    messagingSenderId: "630261503793",
    appId: "1:630261503793:web:3a1724ab08aa5a927a8210"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

function SignIn() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
    }
  };

  return (
    <button onClick={signInWithGoogle} className="sign-in-button">
      Sign in with Google
    </button>
  );
}

function SignOut() {
  return auth.currentUser && <button onClick={() => signOut(auth)}>Sign Out</button>;
}

function ChatRoom({ auth, doctorId }) {
  const messagesRef = collection(firestore, "messages");
  const messagesQuery = query(
    messagesRef,
    where("doctorId", "==", doctorId),
    where("patientId", "==", auth.currentUser.uid),
    orderBy("createdAt"),
    limit(25)
  );
  const [messages] = useCollectionData(messagesQuery, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      doctorId, 
      photoURL,
    });

    setFormValue("");
  };

  return (
    <>
      <div className="chat-messages">
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} auth={auth} />
          ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          className="input-field"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button className="send-button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

function ChatMessage({ message, auth }) {
  const { text, uid, photoURL } = message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
      {photoURL && <img src={photoURL} alt="User" />}
    </div>
  );
}

const Chat = () => {
  const [user] = useAuthState(auth);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleSelectDoctor = (doctorId) => {
    setSelectedDoctor(doctorId);
  };

  return (
    <div className="chat-system">
      {user ? (
        <>
          <SignOut />
          <DoctorList onSelectDoctor={handleSelectDoctor} />
          {selectedDoctor && <ChatRoom auth={auth} doctorId={selectedDoctor} />}
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Chat;