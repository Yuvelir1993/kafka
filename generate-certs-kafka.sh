#!/bin/bash

rm -rf .certs
mkdir .certs
# Root CA
echo "Creating CA certificate and key"
openssl req -new -x509 -keyout .certs/ca.key -out .certs/ca.crt -days 365 -subj "/CN=Sample CA/OU=US/O=US/ST=US/C=US" -passout pass:Password123++
.certs/
echo "Creating Truststore"
keytool -keystore .certs/kafka.truststore.jks -alias CARoot -import -file .certs/ca.crt -storepass Password123++ -keypass Password123++ -noprompt

# Node certs

echo "Creating node key"
keytool -keystore .certs/kafka.keystore.jks -alias kafka -validity 365 -genkey -keyalg RSA -dname "cn=kafka, ou=US, o=US, c=US" -storepass Password123++ -keypass Password123++
echo "Creating certificate sign request"
keytool -keystore .certs/kafka.keystore.jks -alias kafka -certreq -file .certs/tls.srl -storepass Password123++ -keypass Password123++
echo "Signing certificate request using self-signed CA"
openssl x509 -req -CA .certs/ca.crt -CAkey .certs/ca.key \
    -in .certs/tls.srl -out .certs/tls.crt \
    -days 365 -CAcreateserial \
    -passin pass:Password123++
echo "Adding Ca certificate to the keystore"
keytool -keystore .certs/kafka.keystore.jks -alias CARoot -import -file .certs/ca.crt -storepass Password123++ -keypass Password123++ -noprompt
echo "Adding signed certificate"
keytool -keystore .certs/kafka.keystore.jks -alias kafka -import -file .certs/tls.crt -storepass Password123++ -keypass Password123++ -noprompt

# Cleanup
rm .certs/tls.crt .certs/tls.srl .certs/ca.srl