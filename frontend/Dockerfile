# Stage 1: Build the application
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Install application dependencies
RUN npm install

# Install pm2 globally
RUN npm install -g pm2

# Copy the rest of the application code
COPY . .

# Expose port 80 to the outside world
EXPOSE 80

# Command to start the application with pm2
CMD ["pm2-runtime", "start", "index.js", "--name", "backendapi"]
