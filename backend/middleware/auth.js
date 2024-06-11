const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.token || req.headers['x-access-token'];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
