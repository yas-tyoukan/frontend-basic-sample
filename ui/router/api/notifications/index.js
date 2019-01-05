const router = require('express').Router();
const axios = require('axios');

router.route('/').get((req, res, next) => {
  // 環境変数を元にURLを生成する。今回は省略して固定
  const url = 'http://localhost:3001/notifications';

  axios.get(url)
    .then(({ data }) => res.json(data))
    .catch(next);
});

module.exports = router;
