const express = require("express");
const PORT = parseInt(process.env.PORT || "8090");
const app = express();
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'js-producer',
    brokers: ['172.29.17.18:9092']
});
const producer = kafka.producer();

app.post('/', (req, res) => {
    res.send('POST request to homepage')
});

app.post("/postMessage", async (req, res) => {
    console.log("Posting message to Kafka.");
    var message = req.message;
    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: message },
        ],
    })

    await producer.disconnect()
});

app.get("/", async (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log(`Listening for requests on http://localhost:${PORT}`);
});