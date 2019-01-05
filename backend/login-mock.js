module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    const { id, password } = req.body;
    if (id === 'user1' && password === 'p') {
      res.status(200).json({ user: { id, name: '苗木誠' } });
    } else {
      res.status(401).json({ message: 'failed' });
    }
    return;
  }
  if (req.method === 'GET' && req.path === '/notifications') {
    res.status(200).json([
      { id: '1', date: '2018/12/25', message: 'メリークリスマス！' },
      { id: '2', date: '2019/01/01', message: 'あけましておめでとう！' },
    ]);
    return;
  }

  next();
};
