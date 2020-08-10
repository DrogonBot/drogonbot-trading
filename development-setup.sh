#!/bin/bash

# Bash color output setup
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

printColor () {
  printf "${YELLOW}$1${NC}\n"
}

# Other important constants
PROJECT_FOLDER="/home/jonit/Personal_projects/drogonbot"

# Setup docker-compose production file
if test -f "./environment/docker-compose.dev.yml"; then
  printColor "Preparing docker-compose development file..."
  sudo cp ./environment/docker-compose.dev.yml ./docker-compose.yml
  
  else 
    echo "You must have a docker-compose.dev.yml template file on /environment to proceed!"
    exit
  
fi

# Setup .env production file
if test -f "./environment/dev.env"; then
  printColor "Preparing env production file..."
  sudo cp ./environment/dev.env ./.env
  
  else 
    echo "You must have a dev.env template file on /environment to proceed!"
    exit
  
fi
 
printColor "Adding current user to docker group (It will avoid having to type sudo on docker-compose)"
sudo usermod -aG docker $USER

# install node, npm and yarn
printColor "Installing NodeJS, npm and yarn"
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

node -v
npm -v
yarn -v

# install our apps dependencies to avoid potential errors
sudo yarn install

printColor "CONFIGURING NGINX PROXY-NETWORKS"
printColor "Reference: https://blog.ssdnodes.com/blog/host-multiple-ssl-websites-docker-nginx/"

# configure nginx-proxy
cd nginx-proxy
docker network create nginx-proxy
docker-compose up -d
cd ..

printColor "nginx-proxy configured! This probably saved some years of your precious life."
printColor "*** *** REMEMBER TO CONFIGURE YOUR SUBDOMAINS DNS IN YOUR VPS PROVIDER! Check the tutorial above for more info *** ***"

# start containers
docker-compose up --build