FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

FROM node:18-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

RUN mkdir -p /app/img_uploads_temp && \
    chown -R node:node /app/img_uploads_temp

USER node

CMD ["node", "dist/index.js"]

