FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

COPY package*.json ./


COPY . .

RUN npm install

EXPOSE 80

CMD [ "npm", "run", "deploy" ]