const express = require('express');
const cors = require('./shared/cors');
const parser = require('body-parser').json();
const jwtverify = require('./auth/verify-jwt');
const auth = require('./auth');
const { connect } = require('./shared/mongoose');
const cookieParser = require('cookie-parser')();

const app = express();

app.use(cors);
app.use(parser);
app.use(cookieParser);
app.use(jwtverify);
app.use('/auth', auth);

connect().then(() => app.listen(4000));
