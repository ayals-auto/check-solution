FROM node:latest as build

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app
RUN mkdir /app/node-server
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY /devops-sol-check/package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli
RUN npm install pm2 -g

# add app
COPY . /app
RUN cp server.js node-server
# run tests


# generate build
RUN cd devops-sol-check
RUN ng build --output-path=dist
RUN pm2 start /app/node-server/server.js
############
### prod ###
############

# base image
FROM nginx:1.17.0-alpine

# copy artifact build from the 'build environment'
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]