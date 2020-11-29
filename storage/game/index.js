const express = require('express');
const onlyAuth = require('../auth/only-auth');
const Game = require('./game');
const security = require('./security');

const router = express.Router();

router.get(
  '/:id',
  /* everyone can*/ async (req, res) => {
    const game = await Game.getGame(req.params.id, req.uid);
    const status = game ? 200 : 404;
    res.status(status).json({ game });
  }
);

router.get('/', onlyAuth, async (req, res) => {
  const games = await Game.getUserGames(req.uid, req.uid);
  res.status(200).json({ games });
});

router.post('/', onlyAuth, security, async (req, res) => {
  try {
    const {
      questions,
      answers,
      name = 'Untitled Partydeck',
      lng = 'en',
      isPrivate = false,
    } = req.body;
    const game = await Game.createGame(
      questions,
      answers,
      req.uid,
      name,
      lng,
      isPrivate
    );
    res.status(201).json({ id: game._id });
  } catch (err) {
    res.status(422).json({ error: 'validation error' });
  }
});

router.put('/:id', onlyAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await Game.updateGame(id, req.body);
    res.status(200).json({ status: 200 });
  } catch (err) {
    res.status(422).json({ error: 'validation error' });
  }
});

router.delete('/:id', onlyAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await Game.deleteGame(id);
    res.status(200).json({ status: 200 });
  } catch (err) {
    res.status(422).json({ error: 'validation error' });
  }
});

module.exports = router;
