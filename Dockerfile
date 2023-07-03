FROM node:18.12.1

WORKDIR /app

EXPOSE 3000

CMD ["yarn", "dev"]
