const express = require('express');
const cors = require('./shared/cors');
const parser = require('body-parser').json();
const jwtverify = require('./auth/verify-jwt');

const app = express();

app.use(cors, parser, jwtverify);
