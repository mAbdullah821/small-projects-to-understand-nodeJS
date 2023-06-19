const tokenService = require('../services/token-service');

const validateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);

    const { valid, data } = await tokenService.validateToken(token);

    if (!valid) return next(new Error('Invalid bearer token!'));

    req.user = data;
  }

  next();
};

module.exports = validateToken;
