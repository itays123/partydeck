if (!process.env.TARGET) throw new Error('target must be specified');

if (process.env.PORT < 4000)
  // aka react-scripts specified the port
  throw new Error('wrong environment');

const path = require('path');
const fs = require('fs');
const envFile = path.resolve(process.cwd(), 'secrets.json');

let rawdata = fs.readFileSync(envFile);
let { local, cloud } = JSON.parse(rawdata);
let data = process.env.TARGET === 'cloud' ? cloud : local;

const { MONGO_URI, JWT_SECRET, SERVER_URL } = data;

if (!MONGO_URI || !JWT_SECRET)
  throw new Error('Environment congifuration failed');

if (process.env.TARGET === 'cloud' && JWT_SECRET.length < 10)
  throw new Error('Wrong Environment');

module.exports = { MONGO_URI, JWT_SECRET, SERVER_URL };
