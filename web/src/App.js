import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import TextLines from './TextLines';

const socket = io('http://172.29.17.18:8080');

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (data) => {
      // Handle incoming data from Kafka consumer here
      console.log('Received data from Kafka consumer:', data);

      // Update the state with the new message
      setMessages((prevMessages) => [...prevMessages, data.value]);
    });
  }, []);

  return (
    <div className="App">
      <h1>Kafka Consumer App</h1>
      <TextLines messages={messages} /> {/* Render the TextLines component */}
    </div>
  );
}

export default App;
