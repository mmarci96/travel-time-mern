FROM node:18-alpine AS frontend 

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

FROM nginx:alpine

COPY dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
