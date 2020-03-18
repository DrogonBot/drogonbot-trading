#!/bin/sh

git --work-tree=/home/jonit/empregourgente-backend --git-dir=/home/jonit/repo/empregourgente.com.git checkout -f

# Refresh our ADMIN react app build

npm run build --prefix /home/jonit/empregourgente-backend/admin

# Refresh docker dependencies
docker-compose -f /home/jonit/empregourgente-backend/docker-compose.yml up --build


