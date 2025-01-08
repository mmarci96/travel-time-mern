
FROM node:alpine AS backend

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build TypeScript files
RUN npm run build

CMD ["node", "dist/app.js"]

