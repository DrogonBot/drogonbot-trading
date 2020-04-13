#!/bin/bash

CONTAINER=$1

cd /home/jonit/Personal_projects/emprego-urgente/empregourgente-backend
pwd
echo $CONTAINER


docker-compose restart $CONTAINER