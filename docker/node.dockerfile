FROM node:14.17.6-stretch

WORKDIR /home/node/

RUN apt update
RUN apt install -y vim procps

COPY ./entrypoint.sh /entrypoint.sh
COPY bashrc /root/.bashrc

RUN [ "chmod", "+x", "/entrypoint.sh" ]
# ENTRYPOINT [ "/entrypoint.sh" ]