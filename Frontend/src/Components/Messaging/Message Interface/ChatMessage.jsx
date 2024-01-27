import "../../Messaging/MessageStyles.css";

export default function ChatMessage({ message, isSender, timestamp }) {
    const messageClass = isSender ? "message sender" : "message receiver";
    return (
      <div className={messageClass}>
        <p>{message}</p>
        <span className="timestamp">{timestamp}</span>
      </div>
    );
  }
  