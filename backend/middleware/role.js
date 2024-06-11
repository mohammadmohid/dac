const role = (allowedRoles) => (req, res, next) => {
  if (allowedRoles.includes(req.user.userType)) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

module.exports = role;
