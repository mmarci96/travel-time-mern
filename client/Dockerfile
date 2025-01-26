FROM node:18-alpine AS  client

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

FROM nginx:alpine

COPY  --from=client ./app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
