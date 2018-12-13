const router = require('express').Router();

// ------ APIのルーティング ここから ------ //
router.use('/login', require('./login'));
// ------ APIのルーティング ここまで ------ //

router.all('/*', (req, res) => {
  // APIのルーティングにマッチしなかったものは404をJSONで返す
  res.status(404).json({ url: req.url, message: 'not found' });
});

module.exports = router;
