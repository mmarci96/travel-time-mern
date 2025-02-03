FROM node:18-alpine AS  client

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

ARG NGINX_CONF=nginx.conf

COPY  --from=client ./app/dist /usr/share/nginx/html

COPY ./nginx-config/$NGINX_CONF /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
