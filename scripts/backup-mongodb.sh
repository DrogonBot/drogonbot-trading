#!/bin/bash

DB_CONTAINER="mongo-eu"

# Execute dump command to export db files to mongo container
 
docker exec -it mongo-eu mongodump -o /db-dump/


# then we copy these files (under dump folder) to our host
  
docker cp $DB_CONTAINER:/db-dump ./backups

zip -r ./backups/db-dump.zip ./backups/db-dump

rm -rf ./backups/db-dump