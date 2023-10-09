FROM node:20.8.0

WORKDIR /usr/src/app
COPY package*.json ./
ARG ETH0_IP
ENV ETH0_IP $ETH0_IP
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
