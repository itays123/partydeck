const { verify } = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { uid } = verify(token, 'shh');
    req.uid = uid;
  } catch (err) {
    req.uid = null;
  } finally {
    next();
  }
};
