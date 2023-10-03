const express = require("express");
const HOST = '0.0.0.0';
const PORT = parseInt(process.env.PORT || "8090");
const app = express();
app.use(express.json());
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'js-producer',
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

/**
 * Post message to topic.
 */
app.post('/post-message', (req, res) => {
    const message = req.body.message;
    sendMessageToKafka(message)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(500).json({ error: `Failed to post message to Kafka: ${error}` });
        });
});

const sendMessageToKafka = (message) => {
    const producer = kafka.producer();
    const topic = 'test-topic';
    console.log(`Posting '${message}' message to Kafka's '${topic}' topic.`);

    return producer.connect()
        .then(() => producer.send({
            topic: topic,
            messages: [{ value: message }],
        }))
        .then(() => producer.disconnect())
        .then(() => `Posted '${message}' message to Kafka's '${topic}' topic.`)
        .catch((error) => `Error posting message to Kafka: ${error.message}`);
};

app.listen(PORT, () => {
    console.log(`Listening for requests on http://${HOST}:${PORT}`);
});