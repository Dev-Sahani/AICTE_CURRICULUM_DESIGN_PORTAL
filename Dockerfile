FROM node:18-alpine

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN cd client && npm run build

# Install Chromium browser, for puppeteer(used to create pdf) to work properly.
RUN apk add --no-cache chromium

EXPOSE 8080

CMD ["node", "server.js"]
