# Emprego Urgente

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Development Environment Setup

```
 Ask me
```

## Usage

- Make sure you have docker and docker-compose installed in your machine. Here I'm running these dependencies on Ubuntu 18.04

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

- Access http://localhost:3002 to manage your mongodb database. On production its on mongo-admin.empregourgente.com

## Production Environment Setup

- set the PROJECT_FOLDER variable on scripts/backup-mongodb.sh and ./deployment-setup.sh
- run ./deployment-setup.sh
- remember to setup the VPS DNS records to your subdomains (check deployment-setup tutorials about it)

### Required production files

- You must have the following gitignored files in place:
  - ./sendgrid.env
  - ./src/constants/env.ts
  - ./admin/src/constants/Env.constant.ts
