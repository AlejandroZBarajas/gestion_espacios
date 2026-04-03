#!/bin/sh
# Genera un certificado autofirmado válido por 10 años
# Ejecutar UNA sola vez antes de levantar los contenedores:
#   chmod +x docker/nginx/generate-certs.sh
#   ./docker/nginx/generate-certs.sh

CERTS_DIR="$(dirname "$0")/certs"
mkdir -p "$CERTS_DIR"

openssl req -x509 -nodes -newkey rsa:2048 \
  -keyout "$CERTS_DIR/key.pem" \
  -out    "$CERTS_DIR/cert.pem" \
  -days   3650 \
  -subj   "/C=MX/ST=Chiapas/L=Local/O=MiApp/CN=localhost"

echo ""
echo "✅ Certificados generados en $CERTS_DIR"
echo "   cert.pem → certificado público"
echo "   key.pem  → llave privada"