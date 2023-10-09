const { createServer } = require('http');
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'js-consumer',
    brokers: [`${process.env.ETH0_IP}:9094`]
});
const httpServer = createServer();
const io = require('socket.io')(httpServer, {
    cors: {
        // address of the UI app to avoid CORS problem. Not having it will block the websocket connection.
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on("connection", (socket) => {
    console.log('WebSocket client connected');
});

const consumer = kafka.consumer({ groupId: 'test-group' });
const topic = 'test-topic';
const consume = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = {
                value: message.value.toString(),
            };
            console.log('Received data from Kafka:', data);
            io.emit('message', data);
        },
    });
};
consume().catch((err) => {
    console.error("error in consumer: ", err)
});

httpServer.listen(8080, () => {
    console.log('WebSocket server is running on port 8080.');
});