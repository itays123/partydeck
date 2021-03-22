const express = require('express');
const cors = require('./server/shared/cors');
const jsonParser = require('body-parser').json();
const urlParser = express.urlencoded({ extended: true });
const jwtverify = require('./server/auth/verify-jwt');
const { connect } = require('./server/shared/mongoose');
const cookieParser = require('cookie-parser')();
const { PORT } = require('./server/shared/consts');
const routes = require('./server/routes');

const app = express();

app.use(cors);
app.use(jsonParser);
app.use(urlParser);
app.use(cookieParser);
app.use(jwtverify);
app.use('/api', routes);

connect().then(() =>
  app.listen(PORT, () => console.log(`listening on port ${PORT}`))
);
