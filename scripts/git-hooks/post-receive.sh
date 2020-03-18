#!/bin/sh

git --work-tree=/home/jonit/empregourgente-backend --git-dir=/home/jonit/repo/empregourgente.com.git checkout -f

# Refresh our ADMIN react app build

npm run build --prefix /home/jonit/empregourgente-backend/admin

# Refresh docker dependencies
docker exec -it node-api /bin/bash yarn install
docker exec -it node-admin /bin/bash yarn install

# restart container

docker-compose restart