FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install -g @angular/cli \
    npm install \
    npm install --only=dev --silent 

COPY . .

EXPOSE 8081        