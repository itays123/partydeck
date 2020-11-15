const express = require('express');
const User = require('./user');

const router = express.Router();

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.basicLogin(email, password);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ err: 'login failed' });
  }
});

router.post('/register', (req, res) => {
  try {
    const { email, password, name = 'anonymous' } = req.body;
    const token = await User.register(email, password, name);
    res.status(201).json({ token });
  } catch (err) {
    res.status(401).json({ err: 'signup failed' });
  }
})

module.exports = router;