#!/bin/bash

# Function to generate client certificates
generate_client_certificate() {
    local service_name="$1"
    local passphrase="$2"

    # Generate a client key for the service
    openssl genrsa -out .certs/client-${service_name}-key.pem 2048

    # Create a certificate signing request (CSR) for the service
    openssl req -new -key .certs/client-${service_name}-key.pem -out .certs/client-${service_name}.csr -subj "/CN=${service_name}"

    # Sign the service's CSR with the CA to create the client certificate
    openssl x509 -req -in .certs/client-${service_name}.csr -CA .certs/ca.crt -CAkey .certs/ca.key -CAcreateserial -out .certs/client-${service_name}.crt -days 365 -passin pass:"${passphrase}"
}

# Check the number of arguments
if [ $# -ne 2 ]; then
    echo "Usage: $0 <service_name> <passphrase>"
    exit 1
fi

# Assign arguments to variables
service_name="$1"
passphrase="$2"

# Call the function to generate the client certificate
generate_client_certificate "${service_name}" "${passphrase}"
