import db from "../../../../../Firebase/Firebase-config"; // Adjust the import path as necessary
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Function to send a message
import { getDatabase, ref, push } from 'firebase/database';

const handleSendMessage = async () => {
    if (!message.trim() || !userId) {
      console.error("Cannot send message: message is empty or userId is undefined.");
      return;
    }

    const db = getDatabase();
    const messagesRef = ref(db, 'messages');

    try {
      await push(messagesRef, {
        text: message,
        timestamp: Date.now(), // Realtime Database doesn't have serverTimestamp, use Date.now()
        userId,
        userRole,
      });
      setMessage(""); 
    } catch (error) {
      console.error("Error sending message: ", error);
    }
};


// Function to listen for new messages
export const listenForMessages = (chatRoomId, setMessages) => {
	const messagesRef = ref(database, `messages/${userType}/${userId}`);

	// Listen for new messages
	onValue(messagesRef, (snapshot) => {
		const messagesSnapshot = snapshot.val();
		const messages = messagesSnapshot ? Object.values(messagesSnapshot) : [];
		setMessages(messages);
	});
};
