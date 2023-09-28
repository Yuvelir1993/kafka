const express = require("express");
const HOST = '0.0.0.0';
const PORT = parseInt(process.env.PORT || "8090");
const app = express();
app.use(express.json());
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'js-producer',
    brokers: ['kafka:9092']
});

app.post("/postMessage", async (req, res) => {
    console.log(req.body);
    var message = req.body.message;
    console.log(`Posting '${message}' message to Kafka.`);
    const producer = kafka.producer()

    await producer.connect();
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: message },
        ],
    })

    await producer.disconnect();
    res.send(200, { response: `Posted '${message}' message to Kafka's 'test-topic' topic.` });
});

app.listen(PORT, () => {
    console.log(`Listening for requests on http://${HOST}:${PORT}`);
});