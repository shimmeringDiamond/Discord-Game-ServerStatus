FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN tsc

COPY . .

CMD ["node", "build/main.js"]