const { verify } = require('jsonwebtoken');
const { HEADER, JWT_SECRET } = require('../shared/consts');

module.exports = (req, res, next) => {
  try {
    let token;
    if (req.cookies) token = req.cookies.token;
    else if (req.get(HEADER)) token = req.get(HEADER).split(' ')[1];
    const { uid } = verify(token, JWT_SECRET);
    req.uid = uid;
  } catch (err) {
    req.uid = null;
  } finally {
    next();
  }
};
