const router = require('express').Router();
const axios = require('axios');

router.route('/').post((req, res, next) => {
  const { id, password } = req.body;
  if (!id || !password) {
    // idまたはpasswordがない場合は、バックエンドに送らずにエラーとして処理
    res.status(401).json({ message: 'failed' });
    return;
  }

  // 環境変数を元にURLを生成する。今回は省略して固定
  const url = 'http://localhost:3001/login';

  axios.post(url, { id, password }).then(({ data }) => {
    if (!data.user) {
      // userが渡されなかったらログイン失敗とみなす
      res.status(401).json({ message: 'failed' });
      return;
    }
    // 取得したデータを元にセッションを再生成
    req.session.regenerate((error) => {
      if (error) {
        // セッション再生成に失敗したらエラー
        next(error);
        return;
      }
      // セッションに必要な情報を格納
      const { session } = req;
      const { user } = data;
      session.user = user;
      res.json({ user });
    });
  }).catch(next);
});

module.exports = router;
