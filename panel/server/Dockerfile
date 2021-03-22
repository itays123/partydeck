FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV MONGO_URI=mongodb+srv://itays205:itays123@partydeck.afnwv.mongodb.net/partydecks?retryWrites=true&w=majority

ENV JWT_SECRET=abcdefghijklmnopqrstuvwxyzitayschechner

ENV LIMIT_GAMES=false

ENV SECURE=true

ENV SERVER_URL=https://partydeck-live-server-rewlbc24ka-ue.a.run.app

COPY . .

EXPOSE $PORT

CMD ["npm", "start"]