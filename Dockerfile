FROM node:20

WORKDIR /app

COPY . .

CMD ["sh", "Start.sh"]