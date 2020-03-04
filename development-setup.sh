#!/bin/bash

# Bash color output setup
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

printColor () {
  printf "${YELLOW}$1${NC}\n"
}

# Other important constants
PROJECT_FOLDER="/home/jonit/empregourgente-backend"

printColor "Setting up firewall to open docker related ports"
sudo ufw allow OpenSSH
sudo ufw allow 3000
sudo ufw allow 3001
sudo ufw allow 1234
sudo ufw allow 27017
sudo ufw allow 443
sudo ufw allow 80


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


printColor "nginx-proxy configured! This saved your probably some years of your precious life."
printColor "*** *** REMEMBER TO CONFIGURE YOUR SUBDOMAINS DNS IN YOUR VPS PROVIDER! Check the tutorial above for more info *** ***"

# start containers
docker-compose up --build