FROM node:14.7-alpine

WORKDIR /usr/src/app

COPY ./package.json ./

RUN yarn

COPY . .

CMD ["yarn", "dev"]