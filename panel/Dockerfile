FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL $REACT_APP_API_URL

ARG REACT_APP_GAME_URL

ENV REACT_APP_GAME_URL $REACT_APP_GAME_URL

RUN npm run build

RUN npm install -g serve

EXPOSE $PORT

CMD serve -s build -l $PORT