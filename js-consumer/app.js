const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'js-consumer',
    brokers: ['172.29.17.18:9094'],
    ssl: {
        rejectUnauthorized: true
    },
    sasl: {
        mechanism: 'scram-sha-256',
        username: 'kafka_user',
        password: 'Password123++',
    },
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