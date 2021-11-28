FROM node:16.13.0-stretch

WORKDIR /home/nest/

RUN apt-get update && apt-get install -y \
    vim \
    procps \
    && rm -rf /var/lib/apt/lists/*

COPY ./entrypoint.sh /entrypoint.sh
COPY bashrc /root/.bashrc

RUN [ "chmod", "+x", "/entrypoint.sh" ]