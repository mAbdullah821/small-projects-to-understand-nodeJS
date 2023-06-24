module.exports = (req, res, next) => {
  if (!req.user) {
    req.statusCode = 401;
    return next(new Error('Invalid bearer token!'));
  }
  next();
};
