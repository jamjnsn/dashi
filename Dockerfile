FROM node:14
WORKDIR /usr/src/app

# Copy full source to workdir
COPY . .
COPY settings.default.json ./config/settings.json

RUN npm install
EXPOSE 8000

RUN npm run build

CMD [ "npm", "start" ]