import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import MessageForm from "./MessageForm";
import { useLocation } from 'react-router-dom';
import "../MessageStyles.css";

export default function ChatInterface() {
    const location = useLocation();
    const {userRole, userId } = location.state || {};
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await fetchHelper.get(`/chat/send`);
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        if (userId) {
            fetchMessages();
        }
    }, [userId, userRole]);

    return (
        <div className="chat-container">
            {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg.text} isSender={msg.userId === userId} timestamp={msg.timestamp} />
            ))}
            <MessageForm userId={userId} userRole={userRole} />
        </div>
    );
}