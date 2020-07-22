# Project Setup

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

# Requirements

- NodeJS
- Npm
- Docker
- Docker compose

## Development Environment Setup

- run ./development-setup.sh
- make sure your .env file configuration has development data

## Production Environment Setup

- set the PROJECT_FOLDER variable on scripts/backup-mongodb.sh and ./deployment-setup.sh
- run ./deployment-setup.sh
- remember to setup the VPS DNS records to your subdomains (check deployment-setup tutorials about it)

## Starting your server

- Run:
  ```
  docker-compose up
  ```

## Stopping your server (without losing data)

- Run:
  ```
  docker-compose stop
  ```

## Kill all servers (destroy all data)

- Run:
  ```
  docker-compose down
  ```

## Useful commands

- SSH into running container:

  1. Check the running docker containers:

     ```
     docker ps
     ```

     then select one (name). For example: docker-node-mongo. Then run:

     ```
     docker exec -it docker-node-mongo sh
     ```
