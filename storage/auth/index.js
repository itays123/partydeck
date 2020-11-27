const express = require('express');
const { SECURE } = require('../shared/consts');
const User = require('./user');

const router = express.Router();

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
