const express = require('express');
const cors = require('./shared/cors');
const jsonParser = require('body-parser').json();
const urlParser = express.urlencoded({ extended: true });
const jwtverify = require('./auth/verify-jwt');
const { connect } = require('./shared/mongoose');
const cookieParser = require('cookie-parser')();
const { PORT } = require('./shared/consts');
const routes = require('./routes');

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
app.use('/api', routes);

connect().then(() =>
  app.listen(PORT, () => console.log(`listening on port ${PORT}`))
);
