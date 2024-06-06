FROM node:18-alpine AS build

WORKDIR /app

COPY /client/package*.json ./

RUN npm install

COPY /client/ .

RUN npm run build