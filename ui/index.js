const http = require('http');
const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
// redis使う場合は以下のようなパッケージを使う。今回は省略
// const connectRedis = require('connect-redis');
// const IORedis = require('ioredis');

// -------- 環境変数のチェック -------- //
// 必要な環境変数が足りてるか、起動時に分かるようにしている
// 今回は省略
// 以下例
//  if(process.env.SESSION_SECRET_KEY) {
//    throw new Error('env SESSION_SECRET_KEY is not set.')
//  }

const app = express();

// -------- X-Powered-Byヘッダの無効化 -------- //
app.disable('x-powered-by');

// -------- サーバーの起動 -------- //
const server = http.Server(app);
const port = process.env.NODE_PORT || 3000;
server.listen(port);

// -------- セッションの設定 -------- //
// redisを使うならその設定が必要
// スケーリングする場合はメモリではダメ
// 開発環境ならメモリ、そうでないならredisのように分けると開発環境でredis不要になる
// 今回は省略してメモリストアを固定で使っている
const sessionStore = new expressSession.MemoryStore();


// ------ cookie,sessionの設定 ------- //
// expressSessionのオプションは以下参照
// https://github.com/expressjs/session
const session = expressSession({
  store: sessionStore,
  secret: 'catIsKawaii', // 環境変数で設定などする。今回は省略して固定値
  resave: false,
  saveUninitialized: false,
  rolling: true,
  proxy: false, // reverse proxy経由などの場合はtrueにする。環境で分けるようにする。今回は省略
  cookie: {
    secure: false, // httpsならtrueにする。環境で分けるなどする。今回は省略
    httpOnly: true,
    rolling: true,
    maxAge: 3600000, // ミリ秒で指定。環境変数で設定するべきだが、今回は省略
  },
});

app.use(session);

// ------ テンプレートエンジンの設定 ------ //
// ejsを使う
app.set('views', 'views/pages');
app.set('view engine', 'ejs');

// ------ bodyParserの設定 ------- //
// bodyParserの設定は以下参照
// https://github.com/expressjs/body-parser
// クエリパラメータのパースの設定
app.use(bodyParser.urlencoded({
  // extended: trueにするとオブジェクトのネストや配列を保持したまま受け取れる。"foo[bar]=baz"->{foo:{bar:'baz'}}
  extended: true,
  limit: '10mb',
}));

// リクエストボディの容量制限
app.use(bodyParser.json({
  limit: '10mb',
}));

// ------ ルーティング ------ //
app.use('/', require('./router'));

// ------------------------------------------------- //
//        以下、何のルーティングにもマッチしないorエラー        //
// ------------------------------------------------- //

// いずれのルーティングにもマッチしない(==NOT FOUND)
app.use((req, res) => {
  res.status(404);
  res.render('error', {
    param: {
      status: 404,
      url: req.url,
      message: 'not found',
    },
  });
});

// エラーハンドリング
// eslint-disable-next-line no-unused-vars
app.use((err, req, res) => {
  // 想定されるerrの内容によって場合分けなど
  if (req.method !== 'GET' || /\/api\/.*/.test(req.url)) {
    // GET以外のエラー、または、'/api/*'へのアクセスならエラーオブジェクトを返す
    res.status(500 || err.status);
    res.json(err);
    return;
  }
  // エラーページを返す
  res.render('error', {
    param: {
      status: 500,
      url: req.url,
      message: 'internal server error',
    },
  });
});

module.exports = app;
