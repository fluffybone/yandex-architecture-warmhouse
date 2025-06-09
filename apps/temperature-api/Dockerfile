FROM node:24-alpine AS builder

WORKDIR /usr/src/temperature-api

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]