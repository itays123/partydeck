const express = require('express');
const parser = require('body-parser').json();
const cors = require('./shared/cors');

const app = express();

app.use(parser);
app.use(cors);
