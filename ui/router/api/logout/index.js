const router = require('express').Router();
const axios = require('axios');

router.route('/').post((req, res, next) => {
  // ログインしていない場合は何もしない
  if (!req.session.token) {
    res.json({ result: true });
    return;
  }
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ result: true });
  });
});

module.exports = router;
