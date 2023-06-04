FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i express colors body-parser cors dotenv express express-async-handler mongodb mongoose nodemon 

COPY . .

EXPOSE 5001

CMD ["node","nodemon server/index.js"]