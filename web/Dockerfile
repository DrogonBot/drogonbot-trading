FROM node:10.16.0-alpine

# Where our app will live in the container
WORKDIR /usr/src/app 

# Move package.json and package.lock.json into our container root path (./). It will be used to install all of them later, with npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy our current root to the docker root
COPY . .

# Building the app
RUN npm run build

EXPOSE 3003

CMD [ "npm", "start" ]

