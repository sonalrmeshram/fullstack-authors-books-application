FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY .env* ./              # ← Copies .env file
COPY . .
RUN npm run build          # ← Reads VITE_API_URL from .env

FROM httpd:2.4
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/
EXPOSE 80
