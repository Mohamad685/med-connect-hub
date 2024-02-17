import React, { useState } from "react";
import DoctorList from "./DoctorsList";
import './Chat.css';
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

const patientId=localStorage.getItem('userId')


function ChatMessage({ message, patientId }) {
  const { text, uid } = message;
  const messageClass = uid === patientId ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  );
}



function ChatRoom({ patientId, doctorId }) {
  console.log("Values used in query:", doctorId, patientId);
  const messagesRef = collection(firestore, "messages");
  const messagesQuery = query(
    messagesRef,
    where("doctorId", "==", doctorId),
    where("uid", "==", String(patientId)),
    orderBy("createdAt"),
    limit(25)
  );

  console.log("Messages Query:", messagesQuery);

  
  const [messages] = useCollectionData(messagesQuery, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid: String(patientId),
      doctorId, 
    });

    setFormValue("");
  };
  console.log([messages])
  return (
    <>
    {messages ? (
      <div className="chat-messages">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} patientId={patientId} />
        ))}
      </div>
    ) : (
      <p>Loading messages...</p>
    )}
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








const Chat = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleSelectDoctor = (doctorId) => {
    setSelectedDoctor(doctorId);
  };
  
  console.log("Patient ID:", patientId);
  return (
    <div className="chat-system">
      {patientId && (
        <>   
          <div>
            <DoctorList onSelectDoctor={handleSelectDoctor} />
          </div>
          <div>
            {selectedDoctor && <ChatRoom patientId={patientId} doctorId={selectedDoctor} />}
          </div>
        </>
      )}
    </div>
  );
  
};

export default Chat;