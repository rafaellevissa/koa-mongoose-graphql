FROM node:22

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "node", "build/src/server.js" ]
