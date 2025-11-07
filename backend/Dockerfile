FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g pm2

COPY . .

EXPOSE 80

CMD ["sh", "-c", "node migrate.cjs && pm2-runtime start server.js --name backend-api"]
