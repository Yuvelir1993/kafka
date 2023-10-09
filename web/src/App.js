import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import TextLines from './TextLines';

const socket = io(`http://${process.env.ETH0_IP}:8080`);

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (data) => {
      console.log('Received data from Kafka consumer: ', data);
      setMessages((prevMessages) => [...prevMessages, data.value]);
    });
  }, []);

  return (
    <div className="App">
      <h1>Consumer UI application</h1>
      <TextLines messages={messages} /> {/* Render the TextLines component */}
    </div>
  );
}

export default App;
