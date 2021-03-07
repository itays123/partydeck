const express = require('express');
const { SECURE } = require('../shared/consts');
const onlyAuth = require('./only-auth');
const User = require('./user');
const Game = require('../game/game');

const router = express.Router();

router.get('/profile', onlyAuth, async (req, res) => {
  try {
    const userId = req.uid;
    const user = await User.getUserData(userId);
    if (!user) throw new Error();
    const games = await Game.getUserGames(userId, userId);
    res.status(200).json({ user: { _id: userId, name: user.name, games } });
  } catch (err) {
    res.status(404).json({ err: 'User not found', code: 404 });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.basicLogin(email, password);
    let options = { httpOnly: true, sameSite: false };
    if (SECURE) options['secure'] = true;
    res.cookie('token', token, options);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ err: 'login failed' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, name = 'anonymous' } = req.body;
    const token = await User.register(email, password, name);
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ token });
  } catch (err) {
    res.status(401).json({ err: 'signup failed' });
  }
});

router.delete('/logout', (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
});

router.get('/check', async (req, res) => {
  try {
    const { email } = req.query;
    await User.checkEmailUsed(email);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(409); // 409 CONFLICT
  }
});

module.exports = router;
