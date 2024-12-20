FROM node:22.12.0-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${BACKEND_PORT}


