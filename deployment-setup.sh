#!/bin/bash

# Bash color output setup
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

printf "${YELLOW}Creating swap file (needed so our docker containers can run smoothly)${NC}\n"
printf "${YELLOW}Reference: https://linuxize.com/post/create-a-linux-swap-file/${NC}\n"

sudo fallocate -l 1G /swapfile
sudo dd if=/dev/zero of=/swapfile bs=1024 count=1048576
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo /swapfile swap swap defaults 0 0 | sudo /etc/fstab

printf "${YELLOW}Showing swap${NC} - Obs.: The commands above will fail if you already swapped your memory\n"
sudo swapon --show
printf "${YELLOW}Setting swappiness to 80%${NC}\n"
sudo sysctl vm.swappiness=80

printf "${YELLOW}Adding current user to docker group (It will avoid having to type sudo on docker-compose)${NC}\n"
sudo usermod -aG docker $USER

# install node, npm and yarn
printf "${YELLOW}Installing NodeJS, npm and yarn${NC}\n"
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

node -v
npm -v
yarn -v

# install our apps dependencies to avoid potential errors
sudo yarn install

cd admin
sudo yarn install
npm run build # build react production ready files
cd ..


printf "${YELLOW}Configuring nginx-proxy networks${NC}\n"
printf "${YELLOW}Reference: https://blog.ssdnodes.com/blog/host-multiple-ssl-websites-docker-nginx/${NC}\n"

# configure nginx-proxy
cd nginx-proxy
docker network create nginx-proxy
docker-compose up -d
cd ..


printf "${YELLOW}nginx-proxy configured! This saved your probably some years of your precious life.${NC}\n"
printf "${YELLOW}REMEMBER TO CONFIGURE YOUR SUBDOMAINS DNS IN YOUR VPS PROVIDER!${NC}\n"

# start containers
docker-compose up --build