const csurf = require('csurf');
const logger = require('log4js').getLogger('router.index');
const express = require('express');

const router = express.Router();

// ------ ルーティングのログ出力 ------ //
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

// csrfToken単体で取得(認証チェック不要)
router.get('/csrf-token', (req, res) => {
  res.json({ token: res.locals.csrfToken });
});


// 静的ファイルのルーティング(認証チェック不要)
router.use(express.static('public'));

// ログアウト(認証チェック不要)
router.use('/logout', require('./logout'));

// 認証前でもアクセス可能なURL
// '/login'でルーティングするページ (ログイン(company_codeのパラメータ含む)、ヘルプ、パスワード忘れ)
const loginPageRoutesUrls = /^\/(login(?:\?company_code=\w+)?|help|pasword-reminder-info|password-reset-mail|password-reset(?:\?token=.+)?)$/;

// ログイン前にアクセス可能なAPI
const accessibleAPIsUnlessLogin = /^\/api\/(login|company_settings\/\w+|password-reset|password-reset\/mail|password-reset\/token\/check.*)$/;

// ------ 認証チェックミドルウェア ------ //
router.use((req, res, next) => {
  if (loginPageRoutesUrls.test(req.url) || accessibleAPIsUnlessLogin.test(req.url)) {
    // ログインページ及びログインページでブラウザ側でルーティングするページ及び、ログイン不要でアクセスできるAPIへのアクセスは認証チェックしない
    next();
    return;
  }
  const session = req.session;
  const authenticated = session && session.authenticated;
  if (authenticated) {
    // ログイン済みならならOK
    next();
    return;
  }
  // 未ログイン時
  // GET以外のアクセス及びAPIアクセスの禁止
  if (req.method !== 'GET' || /\/api\/.*/.test(req.url)) {
    // 401を返して終了
    next({ statusCode: 401 });
    return;
  }
  // APIアクセスでないGETアクセスは、ログインページを返す
  // company_codeのパラメータがあればログインページに渡す
  const query = 'company_code' in req.query ? `?company_code=${req.query.company_code}` : '';
  res.redirect(`/login${query}`);
});

// ログイン画面
router.get(loginPageRoutesUrls, (req, res) => {
  res.render('login');
});

router.use(express.static('public_authenticated'));
router.use('/api', require('./api'));
router.use('/', require('./top'));

module.exports = router;
