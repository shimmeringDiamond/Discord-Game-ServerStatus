# Base image
FROM node:14

# Set working directory to /app
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Run the command to start the bot
CMD ["node", "main.js"]