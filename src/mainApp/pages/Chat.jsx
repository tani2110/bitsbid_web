import React, { useState } from 'react';
import Message from './Message';
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    setMessages([...messages, input]);
    setInput('');
  };

  return (
    // <div className="page">
        <div className="chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg} />
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
        </div>
    // </div>
  );
}

export default Chat;
