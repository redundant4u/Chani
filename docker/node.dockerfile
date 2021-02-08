FROM node:15.8.0-stretch-slim

WORKDIR /home/node/

COPY ./entrypoint.sh /entrypoint.sh
RUN [ "chmod", "+x", "/entrypoint.sh" ]
ENTRYPOINT [ "/entrypoint.sh" ]