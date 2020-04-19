#!/bin/bash


ROOT_FOLDER="/home/jonit/empregourgente-backend" # Production path
DB_CONTAINER="app-database"
PROJECT_FOLDER=$(awk -F'=' '/^PROJECT_FOLDER/ { print $2}'  ${ROOT_FOLDER}/.env)
PROD_ENV="${PROJECT_FOLDER}/.env"
BACKUPS_FOLDER="${PROJECT_FOLDER}/backups"
BACKUP_FILE="${BACKUPS_FOLDER}/db-dump.zip"
# Check if backup file already exists. If so, delete it.

if test -f ${BACKUP_FILE}; then
  echo "Backup file already exists, deleting it to create a new one"
  rm -f ${BACKUP_FILE}
fi


echo "Loading production .env from ${PROD_ENV}"

USERNAME=$(awk -F'=' '/^MONGO_INITDB_ROOT_USERNAME/ { print $2}'  ${PROD_ENV})
PASSWORD=$(awk -F'=' '/^MONGO_INITDB_ROOT_PASSWORD/ { print $2}'  ${PROD_ENV})
 
# Execute dump command to export db files to mongo container
 
docker exec -it app-database mongodump -u ${USERNAME} -p ${PASSWORD}  -o /db-dump/

# then we copy these files (under dump folder) to our host
  
docker cp $DB_CONTAINER:/db-dump ${PROJECT_FOLDER}/backups/db-dump

zip -r ${PROJECT_FOLDER}/backups/db-dump.zip ${PROJECT_FOLDER}/backups/db-dump

rm -rf ${PROJECT_FOLDER}/backups/db-dump

chmod 755 ${PROJECT_FOLDER}/backups/db-dump.zip

# SUBMIT THE FILE THROUGH EMAIL (SENDGRID API)

SENDGRID_API_KEY=$(awk -F'=' '/^SENDGRID_API_KEY/ { print $2}'  ${PROD_ENV})

EMAIL_TO=$(awk -F'=' '/^ADMIN_EMAIL/ { print $2}'  ${PROD_ENV})
FROM_EMAIL=$(awk -F'=' '/^ADMIN_EMAIL/ { print $2}'  ${PROD_ENV})
FROM_NAME=$(awk -F'=' '/^APP_NAME/ { print $2}'  ${PROD_ENV})
DATE=$(date +%D)
SUBJECT="Database Backup - ${DATE}"
BASE64_BACKUP_FILE=$(base64 -w 0 ${BACKUP_FILE})

bodyHTML="<p>Your database backup</p>"

SENDGRID_DATA='{"personalizations": [{"to": [{"email": "'${EMAIL_TO}'"}]}],"from": {"email": "'${FROM_EMAIL}'", 
	"name": "'${FROM_NAME}'"},"subject": "'${SUBJECT}'","content": [{"type": "text/html", "value": "'${bodyHTML}'"}], "attachments": [{"content": "'${BASE64_BACKUP_FILE}'", "filename":"db-dump.zip", "type":"application/zip", "disposition":"attachment"}]}'

echo $SENDGRID_DATA > sendgrid-data.json
 
# we output the command to a variable to overcome the "argument is too long" curl error: https://unix.stackexchange.com/questions/325125/curl-argument-list-too-long/325147#325147

SENDGRID_CURL=$( curl -X POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header 'Authorization: Bearer '$SENDGRID_API_KEY \
  --header 'Content-Type: application/json' \
  --data @sendgrid-data.json
)
 
echo $SENDGRID_CURL