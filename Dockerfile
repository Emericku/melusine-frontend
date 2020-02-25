FROM node:alpine as build-stage

WORKDIR /app
COPY src /app/src
COPY public /app/public
COPY package*.json /app/
COPY .env /app/.env
COPY .env.production /app/.env.production

RUN npm install
RUN npm run build

FROM nginx:1.15.2-alpine
COPY --from=build-stage /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
