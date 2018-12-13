module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    const { id, password } = req.body;
    if (id === 'user1' && password === 'p') {
      res.status(200).json({ user: { id } });
    } else {
      res.status(401).json({ message: 'failed' });
    }
    return;
  }
  next();
};
