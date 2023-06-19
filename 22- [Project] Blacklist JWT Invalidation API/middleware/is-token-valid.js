const isTokenValid = (req, res, next) => {
  if (!req.user) return next(new Error('The provided token is not valid!'));
  next();
};

module.exports = isTokenValid;
