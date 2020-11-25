const express = require('express');
const Game = require('../game/game');
const User = require('../auth/user');

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    let { q = '', offset = 0 } = req.query;
    offset = Number(offset);
    const result = await Game.search(q, offset, req.uid);
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ err: 'internal server error', code: 500 });
  }
});

router.get('/:user', async (req, res) => {
  try {
    const userId = req.params.user;
    const user = await User.getUserData(userId);
    if (!user) throw new Error();
    const games = await Game.getUserGames(userId, req.uid);
    res.status(200).json({ user: { _id: userId, name: user.name, games } });
  } catch (err) {
    res.status(404).json({ err: 'User not found', code: 404 });
  }
});

module.exports = router;
