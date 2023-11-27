# Use an official Node runtime as a parent image
FROM node:20.10.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the server application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3002

# Define the command to run the application
CMD ["npm", "start"]
