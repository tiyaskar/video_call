FROM node
LABEL org.opencontainers.image.source=https://github.com/tiyaskar/video_call
RUN apt-get update && apt-get upgrade -y
RUN mkdir /app
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm i
CMD [ "node" ]