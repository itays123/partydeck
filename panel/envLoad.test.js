const envFilePath =
  process.env.TARGET === 'cloud' ? '.env.server.prod' : '.env.server';

const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), envFilePath) });

console.log(process.env.MONGO_URI);
console.log(process.env.JWT_SECRET);
