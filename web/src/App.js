import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import TextLines from './TextLines';

// TODO: use this below, but currently is undefined
// const socket = io(`http://${process.env.ETH0_IP}:8080`);
const socket = io(`http://172.29.17.18:8080`);

function App() {
  const [messages, setMessages] = useState([]);
  console.log(process.env);
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
