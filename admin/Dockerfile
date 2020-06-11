  FROM node:10.16.0-alpine

  WORKDIR /usr/src/app

  # install and cache app dependencies
  COPY package*.json ./

  RUN npm install

  COPY . .

  EXPOSE 3003

  CMD ["npm", "run", "dev"]