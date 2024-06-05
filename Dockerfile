FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install Chromium browser, for puppeteer(used to create pdf) to work properly.
RUN apk add --no-cache chromium

COPY . .

# Copy the React build files from the client
COPY --from=client /app/build ./client/build

EXPOSE 4000

CMD ["node", "server.js"]
