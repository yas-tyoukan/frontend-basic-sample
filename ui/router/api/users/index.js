const router = require('express').Router();
const axios = require('axios');

router.route('/me').get((req, res, next) => {
  const { session: { user } } = req;
  res.json(user);
});

module.exports = router;
