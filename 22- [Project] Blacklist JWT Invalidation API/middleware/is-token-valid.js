module.exports = (req, res, next) => {
  if (!req.user) {
    req.statusCode = 401;
    return next(new Error('The provided token is not valid!'));
  }
  next();
};
