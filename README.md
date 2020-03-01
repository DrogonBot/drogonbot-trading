# NodeJS Server Boilerplate

by Joao Paulo Furtado

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

First you should configure your serverConfig.ts file inside src/constants folder. It should follow the following format:

```
const appName = 'App Boilerplate';
const supportEmail = 'email@gmail.com';

export const serverConfig = {
  app: {
    name: appName,
    devUrl: 'http://localhost:3000/',
    productionUrl: 'https://appboilerplate.io'
  },
  email: {
    supportEmail,
    sendGridAPIKey:
      'API_KEY',
    templatesFolder: './src/emails/templates',
    globalTemplateVars: {
      'Product Name': appName,
      'Sender Name': 'Joao',
      'Company Name, LLC': 'App Boilerplate Inc',
      'Company Address': '1234, Street Rd. Suite 1234'
    }
  }
  maintenanceMode: false,
  language: 'eng',
  jwtSecret: 'yourJWTTOKEN'
};
```

## Usage

Run:

```
docker-compose up

```

## Useful commands

- SSH into running container:

1. Check the running docker containers:

```
docker ps
```

then select one (name). For example: docker-node-mongo. Then run:

```
docker exec -it docker-node-mongo /bin/bash
```

## Mongo Admin

- Access http://localhost:1234 to manage your mongodb database

# Deployment

set the PROJECT_FOLDER variable on scripts/backup-mongodb.sh and ./deployment-setup.sh
run ./deployment-setup.sh
remember to setup the VPS DNS records to your subdomains (check deployment-setup tutorials about it)

remember to copy some git ignored files
