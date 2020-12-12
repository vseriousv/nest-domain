FROM ubuntu:18.04 As development
#ARG SSH_KEY
#ARG IMAGE_TAG
#LABEL image_tag="$IMAGE_TAG"
RUN apt update \
 && apt install -y \
    curl \
    gnupg \
    gcc \
    g++ \
    make \
    software-properties-common \
    ca-certificates \
 && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
 && apt install -y nodejs \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app
RUN npm i -g pm2 npm
# Add packages
RUN apt-get update
ENV PACKAGES="libpng-dev git nano bash mc libudev-dev libusb-1.0-0"
RUN apt-get install -y $PACKAGES
COPY package*.json ./
# Add temporary packages, and build the NPM packages/binaries
ENV EPHEMERAL_PACKAGES="autoconf automake g++ gcc libtool make nasm python git"
RUN apt-get install -y $EPHEMERAL_PACKAGES \
  && npm install node-gyp -g \
  && npm i \
  && npm rebuild bcrypt --build-from-source
RUN npm install
COPY . .
#RUN ssh-agent sh -c 'echo $SSH_KEY | base64 -d | ssh-add - ; npm run build
RUN npm run build
