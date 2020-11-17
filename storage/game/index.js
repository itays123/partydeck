const express = require('express');
const onlyAuth = require('../auth/only-auth');
const Game = require('./game');

const router = express.Router();

router.get(
  '/:id',
  /* everyone can*/ async (req, res) => {
    const game = await Game.getGame(req.params.id);
    const status = game ? 200 : 404;
    res.status(status).json({ game });
  }
);

router.post('/', onlyAuth, async (req, res) => {
  const { questions, answers, lng = 'en' } = req.body;
  try {
    const game = await Game.createGame(questions, answers, req.uid, lng);
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
