const express = require('express');
const cors = require('./shared/cors');
const jsonParser = require('body-parser').json();
const urlParser = express.urlencoded({ extended: true });
const jwtverify = require('./auth/verify-jwt');
const auth = require('./auth');
const game = require('./game');
const { connect } = require('./shared/mongoose');
const cookieParser = require('cookie-parser')();
const publicRoutes = require('./shared/pubic-routes');
const { PORT } = require('./shared/consts');

const app = express();

app.use(cors);
app.use(jsonParser);
app.use(urlParser);
app.use(cookieParser);
app.use(jwtverify);
app.use('/auth', auth);
app.use('/game', game);
app.use(publicRoutes);

connect().then(() => app.listen(PORT));
