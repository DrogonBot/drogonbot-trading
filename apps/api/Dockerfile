FROM node:12

WORKDIR /usr/src/app

RUN npm i lerna -g --loglevel notice

# COPY ROOT FILES

COPY package.json .
COPY tsconfig.json .
COPY lerna.json .
COPY yarn.lock .

# ADD SHARED PACKAGES AND APPS
ADD apps/api ./apps/api
ADD packages ./packages

# Install workspace dependencies ( eg. lerna, typescript, etc)
RUN yarn install --non-interactive

# BUILD NODE MODULES DEPENDENCIES 
# bootstrap will link all packages, and build will compile typescript! It should be executed on this order, otherwise it will fail.
RUN lerna bootstrap

#Compile TS in all packages
RUN lerna run build


EXPOSE 3000

WORKDIR /usr/src/app/apps/api

CMD ["yarn", "dev"]



