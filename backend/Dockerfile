FROM node:18-alpine

WORKDIR /user/src/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3500

CMD [ "npm", "run", "start:dev" ]
