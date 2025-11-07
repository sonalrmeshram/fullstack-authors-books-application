FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18
WORKDIR /app

# Install serve and mysql2 for migration
RUN npm install -g serve
RUN npm install mysql2

# Copy built files
COPY --from=build /app/dist/ /var/www/html/

# Copy migration files
COPY migrate.cjs db.json ./

EXPOSE 80

# Run migration then serve the app
CMD ["sh", "-c", "node migrate.cjs && serve -s /var/www/html -l 80"]
