# A minimal Docker image with Node and Puppeteer
#
# Based upon:
# https://medium.com/@christopher.talke/using-node-puppeteer-with-docker-without-wanting-to-smash-your-keyboard-ed78e9529a8b

FROM node:10.17.0-slim@sha256:17df3b18bc0f1d3ebccbd91e8ca8e2b06d67cb4dc6ca55e8c09c36c39fd4535d
    
RUN  apt-get update \
     # Install latest chrome dev package, which installs the necessary libs to
     # make the bundled version of Chromium that Puppeteer installs work.
     && apt-get install -y wget --no-install-recommends \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-unstable --no-install-recommends \
     && rm -rf /var/lib/apt/lists/* \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh


# This section downloads and installs dumb-init which is a small process handler written in C that is recommened to be used within our docker image, in short this will ensure that there are no zombie instances/processes of chrome (or other processes you are targeting) from running if your script fails to close a target instance/process (just imagine having 1000s of dead chrome tabs running, eventually you will run out of resources without this!)

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init


# Where our app will live in the container
WORKDIR /usr/src/app 


# Move package.json and package.lock.json into our container root path (./). It will be used to install all of them later, with npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy our current root to the docker root
COPY . .

# Expose port 3000, so we can access our server.  
EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

# This will run our npm run dev command under package.json
CMD ["npm","run","dev"] 
