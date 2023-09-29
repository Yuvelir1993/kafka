#!/bin/bash

passphrase="PasswordSecretPassphrase123++"

rm -rf .certs
mkdir .certs

# Call the Kafka certificate generation script
./generate-kafka-certificates.sh "${passphrase}"

# Call the producer certificate generation script
./generate-client-certificate.sh producer "${passphrase}"

# Call the consumer certificate generation script
./generate-client-certificate.sh consumer "${passphrase}"
