import React from "react";
import ChatMessage from "./ChatMessage";
import MessageForm from "./MessageForm";
import { useLocation } from 'react-router-dom';
import "../MessageStyles.css";

export default function ChatInterface() {
    const location = useLocation();
    const { userType, userId } = location.state || {};
  
    return (
        <div className="chat-container">
            <ChatMessage userId={userId} userType={userType} />
            <MessageForm userId={userId} userType={userType} />
        </div>
    );
}