FROM node:20.5
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm --loglevel verbose install -g npm@latest

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
