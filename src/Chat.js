import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Backend server URL

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setChatLog((prev) => [...prev, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
  <h2 style={{ textAlign: 'center', marginBottom: 20 }}>💬 Kafka Chat</h2>

  <div style={{
    border: '1px solid #ddd',
    borderRadius: 10,
    height: 400,
    overflowY: 'auto',
    padding: 15,
    background: '#f9f9f9',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'column',
  }}>
    {chatLog.map((msg, i) => (
      <div
        key={i}
        style={{
          alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
          background: i % 2 === 0 ? '#e0f7fa' : '#d1c4e9',
          padding: '10px 15px',
          borderRadius: 20,
          marginBottom: 8,
          maxWidth: '75%',
          wordBreak: 'break-word',
        }}
      >
        {msg}
      </div>
    ))}
  </div>

  <div style={{ display: 'flex', alignItems: 'center' }}>
    <input
      type="text"
      placeholder="Type your message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      style={{
        flex: 1,
        padding: 10,
        borderRadius: 20,
        border: '1px solid #ccc',
        outline: 'none',
        fontSize: 16,
      }}
    />
    <button
      onClick={sendMessage}
      style={{
        padding: '10px 18px',
        marginLeft: 10,
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: 20,
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: 16,
      }}
    >
      Send
    </button>
  </div>
</div>

  );
};

export default Chat;
