#!/bin/bash

DB_CONTAINER="node-database"
PROJECT_FOLDER="/home/jonit/empregourgente-backend"

# Execute dump command to export db files to mongo container
 
docker exec -it ${DB_CONTAINER} mongodump -o /db-dump/


# then we copy these files (under dump folder) to our host
  
docker cp $DB_CONTAINER:/db-dump ${PROJECT_FOLDER}/backups/db-dump

zip -r ${PROJECT_FOLDER}/backups/db-dump.zip ${PROJECT_FOLDER}/backups/db-dump

rm -rf ${PROJECT_FOLDER}/backups/db-dump