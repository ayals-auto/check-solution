# Stage 0, "build-stage", based on Node.js, to build and compile Angular
FROM node:latest as build-stage

RUN apt-get update && apt-get install -yq libgconf-2-4
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:1.17
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
