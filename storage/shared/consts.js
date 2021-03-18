module.exports.HEADER = 'Authorization';
module.exports.MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/partydecks';
module.exports.LIMIT_GAMES = Boolean(process.env.LIMIT_GAMES !== 'false');
module.exports.PORT = Number(process.env.PORT || 4000);
module.exports.JWT_SECRET = process.env.JWT_SECRET || '1234';
module.exports.SECURE = Boolean(process.env.SECURE === 'true');
module.exports.SERVER_URL = process.env.SERVER_URL || 'http://localhost:8000';
