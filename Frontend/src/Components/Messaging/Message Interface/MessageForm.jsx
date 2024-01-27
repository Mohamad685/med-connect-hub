import React, { useState, useEffect } from 'react';
import { ref, push } from 'firebase/database';
import db from '../../../../../Firebase/Firebase-config'; 
import "../../Messaging/MessageStyles.css";


export default function MessageForm() {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserRole = localStorage.getItem("userRole");

    setUserId(storedUserId);
    setUserRole(storedUserRole);
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim() || !userId) {
      console.error("Cannot send message: message is empty or userId is undefined.");
      return;
    }

    const newMessage = {
      text: message,
      timestamp: Date.now(),
      userId,
      userRole,
    };

    try {
      await push(ref(db, "messages"), newMessage);
      setMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    handleSendMessage();
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}
