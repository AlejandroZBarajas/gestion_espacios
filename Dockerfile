# Etapa 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: servidor estático (solo sirve archivos, nginx externo hace el proxy)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Config mínima para SPA (React Router)
COPY docker/nginx/spa.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]