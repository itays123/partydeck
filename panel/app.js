const express = require('express');
const cors = require('./server/shared/cors');
const jsonParser = require('body-parser').json();
const urlParser = express.urlencoded({ extended: true });
const jwtverify = require('./server/auth/verify-jwt');
const auth = require('./server/auth');
const game = require('./server/game');
const { connect } = require('./server/shared/mongoose');
const cookieParser = require('cookie-parser')();
const publicRoutes = require('./server/shared/pubic-routes');
const { PORT } = require('./server/shared/consts');

const app = express();

app.use(cors);
app.use(jsonParser);
app.use(urlParser);
app.use(cookieParser);
app.use(jwtverify);
app.use('/auth', auth);
app.use('/game', game);
app.use(publicRoutes);

connect().then(() =>
  app.listen(PORT, () => console.log(`listening on port ${PORT}`))
);
