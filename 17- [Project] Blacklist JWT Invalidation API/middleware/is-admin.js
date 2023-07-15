module.exports = (req, res, next) => {
  if (req.user.rule === 'admin') {
    return next();
  }

  req.statusCode = 401;
  next(new Error('User unauthorized for these routes!'));
};
