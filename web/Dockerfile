# Use an official Node.js runtime as a parent image
FROM node:20.7.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port for the React app to run on (default is 3000)
EXPOSE 3000

# Define the command to run your React app
CMD ["npm", "start"]
