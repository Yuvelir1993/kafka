const { createServer } = require('http');
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'js-consumer',
    brokers: ['172.29.17.18:9094']
});
const httpServer = createServer();
const io = require('socket.io')(httpServer);

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