const { HEADER } = require('../shared/consts');
const { verify } = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const header = req.get(HEADER);
    const [, token] = header.split(' ');
    const { uid } = verify(token, 'shh');
    req.uid = uid;
  } catch (err) {
    req.uid = null;
  } finally {
    next;
  }
};
