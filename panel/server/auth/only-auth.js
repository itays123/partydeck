module.exports = (req, res, next) => {
  if (!req.uid) {
    res.status(401).json({ err: 'not authenticated', code: 401 });
  } else {
    next();
  }
};
