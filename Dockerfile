FROM node:14

WORKDIR /usr/src/app

COPY ./package.json ./

RUN yarn

COPY . .

CMD ["yarn", "dev"]