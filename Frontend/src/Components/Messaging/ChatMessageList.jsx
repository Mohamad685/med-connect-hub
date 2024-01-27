import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, query, orderByChild } from 'firebase/database';
import "../../Messaging/MessageStyles.css";


export const ChatMessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = query(ref(db, 'messages'), orderByChild('timestamp'));

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messages = [];
      snapshot.forEach((childSnapshot) => {
        messages.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {messages.map((message) => (
        <p key={message.id}>{message.text}</p>
      ))}
    </div>
  );
};
