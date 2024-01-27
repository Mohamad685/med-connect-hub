import { getDatabase, ref, push } from 'firebase/database';

export default handleSendMessage = async () => {
    if (!message.trim() || !userId) {
      console.error("Cannot send message: message is empty or userId is undefined.");
      return;
    }

    const db = getDatabase();
    const messagesRef = ref(db, 'messages');

    try {
      await push(messagesRef, {
        text: message,
        timestamp: Date.now(), 
        userId,
        userRole,
      });
      setMessage(""); 
    } catch (error) {
      console.error("Error sending message: ", error);
    }
};


export const listenForMessages = (chatRoomId, setMessages) => {
	const messagesRef = ref(database, `messages/${userRole}/${userId}`);

	onValue(messagesRef, (snapshot) => {
		const messagesSnapshot = snapshot.val();
		const messages = messagesSnapshot ? Object.values(messagesSnapshot) : [];
		setMessages(messages);
	});
};
