FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Copy the React build files from the client
COPY --from=client /app/build ./client/build

EXPOSE 4000

CMD ["node", "server.js"]
