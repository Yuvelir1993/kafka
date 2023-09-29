#!/bin/bash

# Generate a client key for the producer
openssl genrsa -out .certs/client-producer-key.pem 2048

# Create a certificate signing request (CSR) for the producer
openssl req -new -key .certs/client-producer-key.pem -out .certs/client-producer.csr -subj "/CN=Producer"

# Sign the producer's CSR with the CA to create the client certificate
openssl x509 -req -in .certs/client-producer.csr -CA .certs/ca.crt -CAkey .certs/ca.key -CAcreateserial -out .certs/client-producer.crt -days 365 -passin pass:Password123++
