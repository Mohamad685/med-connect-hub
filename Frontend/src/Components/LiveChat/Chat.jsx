import React, { useState, useEffect } from 'react';
import { firestore, auth } from './firebaseConfig';
import Message from './MessageDisplay';
import MessageInput from './MessageInput';

const Chat = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    const unsubscribe = firestore.collection('messages')
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        const messages = snapshot.docs.map(doc => doc.data());
        setMessages(messages);
      });

    return unsubscribe;
  }, []);

  const sendMessage = (text) => {
    if (user && user.role === 'patient') {
      firestore.collection('messages').add({
        text,
        senderId: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  };

  return (
    <div>
      {messages.map((message, index) => (
        <Message key={index} message={message} currentUser={user} />
      ))}
      {user && user.role === 'patient' && <MessageInput onSendMessage={sendMessage} />}
    </div>
  );
};

export default Chat;
