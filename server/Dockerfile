
FROM node:18-alpine AS backend

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build TypeScript files
RUN npm run build

RUN npm run seed

CMD ["node", "dist/app.js"]

