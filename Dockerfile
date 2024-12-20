FROM node:22.12.0-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${BACKEND_PORT}


FROM node:22.12.0-alpine AS build
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
RUN npm i -g @nestjs/cli
COPY . .
RUN npm run build


FROM gcr.io/distroless/nodejs22-debian12 AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app .
EXPOSE ${BACKEND_PORT}