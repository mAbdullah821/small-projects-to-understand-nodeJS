module.exports = (req, res, next) => {
  if (req.user.rule === 'admin') {
    return next();
  }
  next(new Error('User unauthorized for these routes!'));
};
