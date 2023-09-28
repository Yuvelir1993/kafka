const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'js-producer',
    brokers: ['kafka:9092']
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