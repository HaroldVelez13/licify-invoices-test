FROM node:18

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install --force
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]