const express = require('express');
const cors = require('./shared/cors');
const jsonParser = require('body-parser').json();
const urlParser = express.urlencoded({ extended: true });
const jwtverify = require('./auth/verify-jwt');
const auth = require('./auth');
const game = require('./game');
const { connect } = require('./shared/mongoose');
const cookieParser = require('cookie-parser')();

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(cors);
app.use(jsonParser);
app.use(urlParser);
app.use(cookieParser);
app.use(jwtverify);
app.use('/auth', auth);
app.use('/game', game);

connect().then(() =>
  app.listen(4000, () => console.log('listening on port 4000'))
);
