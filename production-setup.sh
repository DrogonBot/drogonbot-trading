#!/bin/bash

# Bash color output setup
YELLOW='\033[1;33m'
NC='\033[0m' # No Color


printColor () {
  printf "${YELLOW}$1${NC}\n"
}

# Other important constants
PROJECT_FOLDER="/home/jonit/empregourgente-backend"

printColor "IMPORTANT: Make sure you have docker and docker-compose installed on Ubuntu 18.04. Check for 1-click droplets on Digital Ocean"


printColor "Setting up firewall to open docker related ports"
sudo ufw allow OpenSSH
sudo ufw allow 3000
sudo ufw allow 3001
sudo ufw allow 1234
sudo ufw allow 27017
sudo ufw allow 443
sudo ufw allow 80


# Check sendgrid.env file
if test -f "./sendgrid.env"; then
  printColor "Checking sendgrid.env file... OK!"   
  else 
    echo "You must have a ./sendgrid.env file before proceeding!"
    exit
fi

# Check ./src/constants/env.ts file
if test -f "./src/constants/env.ts"; then
  printColor "Checking for ./src/constants/env.ts file... OK!"   
  else 
    echo "You must have a ./src/constants/env.ts file before proceeding!"
    exit
fi

# Setup docker-compose production file
if test -f "./environment/docker-compose.prod.yml"; then
  printColor "Preparing docker-compose production file..."
  sudo cp ./environment/docker-compose.prod.yml ./docker-compose.yml
  
  else 
    echo "You must have a docker-compose.prod.yml template file on /environment to proceed!"
    exit
  
fi

# Setup .env production file
if test -f "./environment/prod.env"; then
  printColor "Preparing env production file..."
  sudo cp ./environment/prod.env ./.env
  
  else 
    echo "You must have a prod.env template file on /environment to proceed!"
    exit
  
fi

# Setup Next.js web app

if test -f "./web/environment/Dockerfile.prod"; then
  printColor "Preparing Next.JS (front-end web) production Dockerfile"
  sudo cp ./web/environment/Dockerfile.prod ./web/Dockerfile
  else 
    echo "You must have a ./web/environment/Dockerfile.prod to proceed!"
    exit
fi

if test -f "./web/environment/Env.constant.prod.ts"; then
  printColor "Preparing Next.JS (front-end web) environment files"
  sudo cp ./web/environment/Env.constant.prod.ts ./web/src/constants/Env.constant.ts
  else 
    echo "You must have a ./web/environment/Env.constant.prod.ts to proceed!"
    exit
fi



printColor "Installing some system necessary packages"

sudo apt-get update
sudo apt install zip
sudo apt install unzip


printColor "Setting up system cron jobs"

# This system cronjob main goal is only to dump mongodb into a zip file inside backups folder. Then, database.cron.ts will periodically submit it to our admin email 
sudo crontab -l > dbBackupCron
echo "0 1 * * * ${PROJECT_FOLDER}/scripts/backup-mongodb.sh" >> dbBackupCron
sudo crontab dbBackupCron
sudo rm dbBackupCron

# Chrome killer (avoid multiple spawned chrome instances from puppeteer hanging and leaking memory)
# commented out for now, because its causing some issues if it conflics with puppeteer running at the same time ("Navigation failed because browser has disconnected!")
# sudo crontab -l > chromeKiller
# echo "0 */3 * * * pgrep chrome | xargs kill -9" >> chromeKiller
# sudo crontab chromeKiller
# sudo rm chromeKiller

# Docker system prune (remove unused data periodically, avoiding your disk to completely fill over time)
sudo crontab -l > dockerSystemPrune
echo "0 */3 * * * docker system prune --all --volumes" >> dockerSystemPrune
sudo crontab dockerSystemPrune
sudo rm dockerSystemPrune


printColor "Creating swap file (needed so our docker containers can run smoothly)"
printColor "Reference: https://linuxize.com/post/create-a-linux-swap-file/"

sudo fallocate -l 1G /swapfile
sudo dd if=/dev/zero of=/swapfile bs=1024 count=1048576
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

sudo bash -c 'echo /swapfile swap swap defaults 0 0 >> /etc/fstab'

printColor "Showing swap  - Obs.: The commands above will fail if you already swapped your memory"
sudo swapon --show
printColor "Setting swappiness to 80"
sudo sysctl vm.swappiness=80

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

printColor "Building admin app..."

cd admin
sudo yarn install
sudo npm run build # build react production ready files
cd ..


printColor "CONFIGURING NGINX PROXY-NETWORKS"
printColor "Reference: https://blog.ssdnodes.com/blog/host-multiple-ssl-websites-docker-nginx/"

# configure nginx-proxy
cd nginx-proxy
docker network create nginx-proxy
docker-compose up -d
cd ..


printColor "nginx-proxy configured! This saved probably some years of your precious life."
printColor "REMEMBER TO CONFIGURE YOUR SUBDOMAINS DNS IN YOUR VPS PROVIDER! Check the tutorial above for more info"

# start containers
docker-compose up --build