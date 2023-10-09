import './App.css';
import io from 'socket.io-client';

const socket = io('http://172.29.17.18:8080');

function App() {
  useEffect(() => {
    socket.on('message', (data) => {
      // Handle incoming data from Kafka consumer here
      console.log('Received data from Kafka consumer:', data);
    });
  }, []);

  return (
    <div className="App">
      {/* Your React UI */}
    </div>
  );
}

export default App;
