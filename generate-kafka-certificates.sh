#!/bin/bash

# Function to generate Kafka certificates
generate_kafka_certificates() {
    local passphrase="$1"

    # Root CA
    echo "Creating CA certificate and key"
    openssl req -new -x509 -keyout .certs/ca.key -out .certs/ca.crt -days 365 -subj "/CN=Sample CA/OU=US/O=US/ST=US/C=US" -passout pass:"${passphrase}"

    # Create Truststore
    keytool -keystore .certs/kafka.truststore.jks -alias CARoot -import -file .certs/ca.crt -storepass "${passphrase}" -keypass "${passphrase}" -noprompt

    # Node certs
    echo "Creating node key"
    keytool -keystore .certs/kafka.keystore.jks -alias kafka -validity 365 -genkey -keyalg RSA -dname "cn=kafka, ou=US, o=US, c=US" -storepass "${passphrase}" -keypass "${passphrase}"
    
    echo "Creating certificate sign request"
    keytool -keystore .certs/kafka.keystore.jks -alias kafka -certreq -file .certs/tls.srl -storepass "${passphrase}" -keypass "${passphrase}"

    echo "Signing certificate request using self-signed CA"
    openssl x509 -req -CA .certs/ca.crt -CAkey .certs/ca.key \
        -in .certs/tls.srl -out .certs/tls.crt \
        -days 365 -CAcreateserial \
        -passin pass:"${passphrase}"

    echo "Adding CA certificate to the keystore"
    keytool -keystore .certs/kafka.keystore.jks -alias CARoot -import -file .certs/ca.crt -storepass "${passphrase}" -keypass "${passphrase}" -noprompt

    echo "Adding signed certificate"
    keytool -keystore .certs/kafka.keystore.jks -alias kafka -import -file .certs/tls.crt -storepass "${passphrase}" -keypass "${passphrase}" -noprompt

    # Cleanup
    rm .certs/tls.crt .certs/tls.srl .certs/ca.srl
}

# Check the number of arguments
if [ $# -ne 1 ]; then
    echo "Usage: $0 <passphrase>"
    exit 1
fi

# Assign the passphrase argument to a variable
passphrase="$1"

# Call the function to generate Kafka certificates
generate_kafka_certificates "${passphrase}"
