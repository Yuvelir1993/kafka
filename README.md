# kafka
Learning Kafka and related to it stuff.

## Docu
[Apache Kafka packaged by Bitnami](https://github.com/bitnami/containers/tree/main/bitnami/kafka#apache-kafka-packaged-by-bitnami)
[Apache Kafka packaged by Bitnami (security section)](https://github.com/bitnami/containers/tree/main/bitnami/kafka#security)
[Apache Kafka packaged by Bitnami (cluster)](https://github.com/bitnami/containers/tree/main/bitnami/kafka#setting-up-a-apache-kafka-cluster)
[Apache Kafka packaged by Bitnami (Dockerhub)](https://hub.docker.com/r/bitnami/kafka)

# Dev
Any environment variable beginning with **KAFKA_CFG_** will be mapped to its corresponding Apache Kafka key. For example, use **KAFKA_CFG_BACKGROUND_THREADS** in order to set **background.threads** or **KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE** in order to configure **auto.create.topics.enable**.

## Get ETH 0 IP
```bash
ip addr show eth0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1
```

## Generate certificates in JKS format
```bash
# Execute if Java is not installed
sudo apt install openjdk-17-jre-headless

# Generate certificates
sh generate-certs-kafka.sh
```

## Run docker services
```bash
docker compose up --build
```

## Kafka
All kafka '*.sh' scripts are palced in /opt/bitnami/kafka/bin/
### Get topics list
```bash
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server=localhost:9092 --list
```
### Get topic details
```bash
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server=localhost:9092 --describe --topic test-topic
```