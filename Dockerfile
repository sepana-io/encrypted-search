# Install dependencies only when needed
FROM node:14-alpine

RUN apk add --no-cache bash

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

CMD ["yarn", "start"]