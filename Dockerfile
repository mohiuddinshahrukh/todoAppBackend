FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i express colors body-parser cors dotenv express-async-handler mongodb mongoose nodemon config jest mongodb-memory-server

COPY . .

EXPOSE 5001

CMD ["node","server/index.js"]

