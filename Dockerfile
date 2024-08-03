FROM node:18-alpine

# Install Chromium browser, for puppeteer(used to create pdf).
RUN apk add --no-cache chromium

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY client/ ./client
RUN cd client && npm run build

COPY . .


EXPOSE 8080

CMD ["node", "server.js"]
