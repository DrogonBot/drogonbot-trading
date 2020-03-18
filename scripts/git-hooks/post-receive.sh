#!/bin/sh

git --work-tree=/home/jonit/empregourgente-backend --git-dir=/home/jonit/repo/empregourgente.com.git checkout -f

# Refresh our ADMIN react app build

npm run build --prefix /home/jonit/empregourgente-backend/admin

# Refresh docker dependencies
docker exec  node-api /bin/bash yarn install
docker exec  node-admin /bin/bash yarn install

# restart container

docker-compose restart