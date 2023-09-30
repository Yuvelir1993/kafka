const { Kafka } = require('kafkajs')
const fs = require('fs');
const kafka = new Kafka({
    clientId: 'js-consumer',
    brokers: ['kafka:9091'],
    ssl: {
        // requestCert: true,
        // rejectUnauthorized: true,
        rejectUnauthorized: false,
        ca: [fs.readFileSync('/certs/ca.crt', 'utf-8')],
        key: fs.readFileSync('/certs/client-consumer-key.pem', 'utf-8'),
        cert: fs.readFileSync('/certs/client-consumer.crt', 'utf-8'),
    }
});

const consumer = kafka.consumer({ groupId: 'test-group' });
const topic = 'test-topic';
const consume = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            });
        },
    });
};
consume().catch((err) => {
    console.error("error in consumer: ", err)
});