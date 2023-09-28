FROM node:20.7.0

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 8090
CMD [ "node", "app.js" ]