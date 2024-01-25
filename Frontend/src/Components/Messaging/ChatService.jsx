import { ref, push } from "firebase/database";
import database from './firebase-config';
import { ref, onValue } from "firebase/database";


// Function to send a message
export const sendMessage = (chatRoomId, message) => {
  // Reference to your chat room
  const chatRoomRef = ref(database, 'chatrooms/' + chatRoomId);
  // Push a new message to the chat room
  push(chatRoomRef, message);
};

// Function to listen for new messages
export const listenForMessages = (chatRoomId, setMessages) => {
  const messagesRef = ref(database, 'chatrooms/' + chatRoomId);

  // Listen for new messages
  onValue(messagesRef, (snapshot) => {
    const messagesSnapshot = snapshot.val();
    const messages = messagesSnapshot ? Object.values(messagesSnapshot) : [];
    setMessages(messages);
  });
};
