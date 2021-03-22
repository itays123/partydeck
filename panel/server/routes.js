const router = require('express').Router();
const auth = require('./auth');
const game = require('./game');
const publicRoutes = require('./shared/pubic-routes');

router.use('/auth', auth);
router.use('/game', game);
router.use(publicRoutes);

module.exports = router;
