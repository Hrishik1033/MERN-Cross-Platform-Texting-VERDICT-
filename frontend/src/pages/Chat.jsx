import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import '../App.css';

const API_BASE = import.meta.env.VITE_API_URL || window.location.origin;

const Chat = () => {
  const socket = useMemo(() => io(API_BASE, { transports: ['websocket', 'polling'] }), []);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    socket.emit('send-message', msg);
    setMsg('');
  };

  useEffect(() => {
    const receive = (data) => {
      const type = data.id === socket.id ? 'sent' : 'received';
      setMessages((prev) => [...prev, { text: data.message, type }]);
    };
    socket.on('receive-message', receive);
    return () => socket.off('receive-message', receive);
  }, [socket]);

  return (
    <div className="container">
      <h2>Chat</h2>
      <div className="mainDiv">
        {messages.map((m, index) => (
          <p key={index} className={m.type}>{m.text}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
