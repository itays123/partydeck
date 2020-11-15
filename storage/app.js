const express = require('express');
const cors = require('./shared/cors');
const parser = require('body-parser').json();
const jwtverify = require('./auth/verify-jwt');
const { connect } = require('./shared/mongoose');

const app = express();

app.use(cors);
app.use(parser);
app.use(jwtverify);

connect().then(() => app.listen(4000));
