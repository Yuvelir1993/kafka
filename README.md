# kafka
Learning Kafka and related to it stuff.

## Docu
[Apache Kafka packaged by Bitnami](https://github.com/bitnami/containers/tree/main/bitnami/kafka#apache-kafka-packaged-by-bitnami)
[Apache Kafka packaged by Bitnami (security section)](https://github.com/bitnami/containers/tree/main/bitnami/kafka#security)
[Apache Kafka packaged by Bitnami (cluster)](https://github.com/bitnami/containers/tree/main/bitnami/kafka#setting-up-a-apache-kafka-cluster)
[Apache Kafka packaged by Bitnami (Dockerhub)](https://hub.docker.com/r/bitnami/kafka)

# Dev
Any environment variable beginning with **KAFKA_CFG_** will be mapped to its corresponding Apache Kafka key. For example, use **KAFKA_CFG_BACKGROUND_THREADS** in order to set **background.threads** or **KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE** in order to configure **auto.create.topics.enable**.