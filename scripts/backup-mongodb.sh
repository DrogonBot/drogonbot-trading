#!/bin/bash

DB_CONTAINER="node-database"
PROJECT_FOLDER="/home/jonit/empregourgente-backend"
PROD_ENV="${PROJECT_FOLDER}/.env"

echo "Loading production .env from ${PROD_ENV}"

USERNAME=$(awk -F'=' '/^MONGO_INITDB_ROOT_USERNAME/ { print $2}'  ${PROD_ENV})
PASSWORD=$(awk -F'=' '/^MONGO_INITDB_ROOT_PASSWORD/ { print $2}'  ${PROD_ENV})
 
# Execute dump command to export db files to mongo container
 
docker exec -it node-database mongodump -u ${USERNAME} -p ${PASSWORD}  -o /db-dump/

# then we copy these files (under dump folder) to our host
  
docker cp $DB_CONTAINER:/db-dump ${PROJECT_FOLDER}/backups/db-dump

zip -r ${PROJECT_FOLDER}/backups/db-dump.zip ${PROJECT_FOLDER}/backups/db-dump

rm -rf ${PROJECT_FOLDER}/backups/db-dump

chmod 755 ${PROJECT_FOLDER}/backups/db-dump.zip