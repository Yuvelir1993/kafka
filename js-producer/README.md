# Dev
Start the app.
```bash
node app
```

## Build docker image
```bash
docker build . -t plozovik/js-producer
```

## Run container
```bash
docker run -p 8090:8090 -d plozovik/js-producer
```

# Docs
[Kafkajs npm library](https://www.npmjs.com/package/kafkajs)
[Kafkajs official page](https://kafka.js.org/)