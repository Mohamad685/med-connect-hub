import React, { useState, useEffect } from 'react';
import { ref, push } from 'firebase/database';
import db from '../../../../../Firebase/Firebase-config'; // Adjust the path as necessary

export default function MessageForm({ userId: propUserId, userRole: propUserRole }) {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(propUserId || localStorage.getItem("userId"));
  const [userRole, setUserRole] = useState(propUserRole || localStorage.getItem("userRole"));

  useEffect(() => {
    if (propUserId) setUserId(propUserId);
    if (propUserRole) setUserRole(propUserRole);
  }, [propUserId, propUserRole]);

  const handleSendMessage = async () => {
    if (!message.trim() || !userId) {
      console.error("Cannot send message: message is empty or userId is undefined.");
      return;
    }

    const newMessage = {
      text: message,
      timestamp: Date.now(), // Use client-side timestamp
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
