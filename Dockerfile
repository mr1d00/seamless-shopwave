# Use a more recent version of Node.js (18-alpine)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for optimized caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project files into the container
COPY . .

# Expose the port that Vite will be running on
EXPOSE 3005

# Build your project (optional, if you have a build step, modify accordingly)
RUN npm run build

# Command to start the development server (or production server)
CMD ["npm", "run", "dev"]
