FROM node:10-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

ENV DB_NAME="echo-prod"
ENV NODE_ENV="prod"

EXPOSE 3000

CMD [ "npm", "run", "start" ]