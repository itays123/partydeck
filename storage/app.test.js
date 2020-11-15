const express = require('express');
const cors = require('./shared/cors');
const parser = require('body-parser').json();
const jwtverify = require('./auth/verify-jwt');
const { connect } = require('./shared/mongoose');

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(cors);
app.use(parser);
app.use(jwtverify);
app.use((req, res) => {
  console.log(req.uid);
  res.sendStatus(200);
});

connect().then(() =>
  app.listen(4000, () => console.log('listening on port 4000'))
);
