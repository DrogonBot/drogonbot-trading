 
FROM node:10-slim

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*


# This section downloads and installs dumb-init which is a small process handler written in C that is recommened to be used within our docker image, in short this will ensure that there are no zombie instances/processes of chrome (or other processes you are targeting) from running if your script fails to close a target instance/process (just imagine having 1000s of dead chrome tabs running, eventually you will run out of resources without this!)

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init
ENTRYPOINT ["dumb-init", "--"]

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


# Uncomment to skip the chromium download when installing puppeteer. If you do,
# you'll need to launch puppeteer with:
#     browser.launch({executablePath: 'google-chrome-unstable'})
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# This will run our npm run dev command under package.json
CMD ["npm","run","dev"] 
