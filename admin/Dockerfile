FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

EXPOSE 5000

ENTRYPOINT ["init.sh"]

CMD [ "npm", "start" ]