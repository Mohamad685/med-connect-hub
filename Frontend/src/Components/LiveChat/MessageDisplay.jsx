import React from 'react';

const Message = ({ message, currentUser }) => {
  const isSender = currentUser && message.senderId === currentUser.uid;

  return (
    <div style={{ textAlign: isSender ? 'right' : 'left' }}>
      <p>{message.text}</p>
    </div>
  );
};

export default Message;
