FROM node:18

WORKDIR /usr/src/app

COPY package.json .

RUN npm install \
    npm install --only=dev --silent 

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]