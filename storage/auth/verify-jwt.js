const { verify } = require('jsonwebtoken');
const { HEADER } = require('../shared/consts');

module.exports = (req, res, next) => {
  try {
    let token;
    if (req.cookies) token = req.cookies.token;
    else if (req.get(HEADER)) token = req.get(HEADER).split(' ')[1];
    const { uid } = verify(token, 'shh');
    req.uid = uid;
  } catch (err) {
    req.uid = null;
  } finally {
    next();
  }
};
