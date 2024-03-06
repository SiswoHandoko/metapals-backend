FROM node:16.17-alpine

WORKDIR /usr/app

COPY . .

RUN npm install --verbose

RUN npm run build 

RUN node_modules/.bin/sequelize db:migrate

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
