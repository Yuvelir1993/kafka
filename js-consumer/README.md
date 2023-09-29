# Dev
## Generate certificates
```bash
sh generate-certs-consumer.sh
```

## Build docker image
```bash
docker build . -t plozovik/js-consumer
```

## Run container
```bash
docker run -d plozovik/js-consumer
```

# Docs
[Kafkajs npm library](https://www.npmjs.com/package/kafkajs)
[Kafkajs official page](https://kafka.js.org/)