# Use Node.js LTS version as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
