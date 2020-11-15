const { sign } = require('jsonwebtoken');

module.exports = uid => {
  const token = sign({ uid }, 'shh');
  return token;
};
