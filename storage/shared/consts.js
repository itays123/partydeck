module.exports.HEADER = 'Authorization';
module.exports.MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/partydecks';
module.exports.LIMIT_GAMES = process.env.LIMIT_GAMES || true;
module.exports.PORT = process.env.PORT || 4000;
module.exports.JWT_SECRET = process.env.JWT_SECRET;
module.exports.SECURE = process.env.SECURE || false;
module.exports.SERVER_URL = process.env.SERVER_URL || 'http://localhost:8000';
