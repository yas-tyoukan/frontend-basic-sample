const express = require('express');
const csurf = require('csurf');

const router = express.Router();

// ------ ルーティングのログ出力など共通処理 ------ //
router.all('/*', (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ------- CSRF対策のミドルウェア設定 ------- //
router.use(csurf({
  cookie: false,
}));

// csrfTokenを格納
router.use((req, res, next) => {
  // CSRF対策トークンを入れる
  const locals = res.locals;
  locals.csrfToken = req.csrfToken();
  return next();
});

// -------- 認証チェックが不要なルーティング設定 ここから -------- //
// csrfToken単体で取得
router.get('/csrf-token', (req, res) => {
  res.json({ token: res.locals.csrfToken });
});

// 静的ファイルのルーティング
router.use(express.static('public'));

// ログイン
// eslint-disable-next-line no-unused-vars
router.use('/login', (req, res, next) => {
  // ログインページを返す
  res.render('login');
});

// ログアウト
router.get('/logout', (req, res, next) => {
  // 未ログインの場合は何もせずに/loginにリダイレクト
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }
  // ログイン済みの場合はセッションを破棄してから/loginにリダイレクト
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/login');
  });
});

// ログインページに飛ばすURLの正規表現
// SPAでログイン後のページではルーティングせずに、ログインページだけでルーティングするURLがあればここに追加する
const urlsRoutedLoginPage = /^\/(login(\/.*)?|logout)$/;

// ログイン前にアクセス可能なAPI
// パスワードリセットAPIへのアクセスなど、login前でも使用するAPIがあればここに追加する
const apisAccessibleWithoutLogin = /^\/api\/login$/;

// ログイン画面
router.get(urlsRoutedLoginPage, (req, res) => {
  res.render('login');
});

// -------- 認証チェックが不要なルーティング設定 ここまで -------- //

// ------------------ 認証チェック ------------------ //
router.use((req, res, next) => {
  if (apisAccessibleWithoutLogin.test(req.url)) {
    // ログイン不要でアクセスできるAPIへのアクセスは認証チェックしない
    next();
    return;
  }
  // ログイン済みかどうかチェック
  const { session } = req;
  const authenticated = session && session.user && session.user.id;
  if (authenticated) {
    // ログイン済みならならOK
    next();
    return;
  }
  // ----- 以下は未ログインの場合 ----- //
  // GET以外のアクセス及びAPIアクセスの禁止
  if (req.method !== 'GET' || /\/api\/.*/.test(req.url)) {
    // 401を返して終了
    // ui/index.jsのエラーハンドリングで処理される
    next({ status: 401 });
    return;
  }
  // APIアクセスでないGETアクセスは、すべてログインページを返す
  res.render('login');
});

// -------- 認証チェックが必要なルーティング設定 -------- //

// 静的ファイルのルーティング
router.use(express.static('public_authenticated'));

// APIのルーティング
router.use('/api', require('./api'));

// ログイン後のページのルーティング
router.get('/*', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.render('app');
});

module.exports = router;
