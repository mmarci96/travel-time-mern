
FROM node:23.4.0-alpine AS backend

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

CMD ["node", "dist/app.js"]

