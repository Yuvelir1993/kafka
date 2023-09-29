#!/bin/bash

# Generate a client key for the consumer
openssl genrsa -out certs/client-consumer-key.pem 2048

# Create a certificate signing request (CSR) for the consumer
openssl req -new -key certs/client-consumer-key.pem -out certs/client-consumer.csr -subj "/CN=consumer"

# Sign the consumer's CSR with the existing CA to create the client certificate
openssl x509 -req -in certs/client-consumer.csr -CA certs/ca.crt -CAkey certs/ca.key -CAcreateserial -out certs/client-consumer.crt -days 365 -passin pass:Password123++
