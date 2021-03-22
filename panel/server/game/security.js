const { LIMIT_GAMES } = require('../shared/consts');
const Game = require('./game');

module.exports = async (req, res, next) => {
  try {
    if (!LIMIT_GAMES) throw 'carry on';
    const games = await Game.find({ author: req.uid }).select('_id');
    if (games.length < 5) throw 'valid';
    res.status(403).json({ err: 'game limit reached', code: 403 });
  } catch (err) {
    next();
  }
};
