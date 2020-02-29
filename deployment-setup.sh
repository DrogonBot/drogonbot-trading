#!/bin/bash

echo "Adding current user to docker group (It will avoid having to type sudo on docker-compose)"
sudo usermod -aG docker $USER

# install node, npm and yarn
echo "Installing NodeJS, npm and yarn"
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
cd ..


# configure nginx-proxy
cd nginx-proxy
docker network create nginx-proxy
docker-compose up -d
cd ..

echo "If you encounter proxy issues, follow this tutorial: https://blog.ssdnodes.com/blog/host-multiple-ssl-websites-docker-nginx/"
echo "nginx-proxy configured"
echo "REMEMBER TO CONFIGURE YOUR SUBDOMAINS DNS!"

# start containers
docker-compose up --build