const jwt = require('../utils/_jwt');
const { JWT_SECRET } = require('../utils/config');

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  try {
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      req.tokenData = await jwt.verify(token, JWT_SECRET);

      req.tokenData.userId = req.tokenData.userId.toString();
      req.tokenData.deviceId = req.tokenData.deviceId.toString();
    }

    next();
  } catch (err) {
    return next(new Error('Invalid bearer token!'));
  }
};
