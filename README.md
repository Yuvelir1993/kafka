# kafka
Learning Kafka and related to it stuff.

## Docu
[Apache Kafka packaged by Bitnami](https://github.com/bitnami/containers/tree/main/bitnami/kafka#apache-kafka-packaged-by-bitnami)
[Apache Kafka packaged by Bitnami (security section)](https://github.com/bitnami/containers/tree/main/bitnami/kafka#security)
[Apache Kafka packaged by Bitnami (cluster)](https://github.com/bitnami/containers/tree/main/bitnami/kafka#setting-up-a-apache-kafka-cluster)
[Apache Kafka packaged by Bitnami (Dockerhub)](https://hub.docker.com/r/bitnami/kafka)
[Apache Kafka broker config](https://docs.confluent.io/platform/current/installation/configuration/broker-configs.html)

### UI projects
[provectus](https://docs.kafka-ui.provectus.io)
[confluent control center](https://hub.docker.com/r/confluentinc/cp-enterprise-control-center)

# Dev
Any environment variable beginning with **KAFKA_CFG_** will be mapped to its corresponding Apache Kafka key. For example, use **KAFKA_CFG_BACKGROUND_THREADS** in order to set **background.threads** or **KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE** in order to configure **auto.create.topics.enable**.

## Set virtual memory size
```bash
sudo sysctl -w vm.max_map_count=362144
```

## Get ETH 0 IP
```bash
ip addr show eth0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1
```

## Run docker Kafka
```bash
docker compose up
```

## Run docker clients
```bash
docker compose -f docker-compose-clients.yml up --build
```

## Post message endpoint
```bash
http://localhost:8090/post-message
```