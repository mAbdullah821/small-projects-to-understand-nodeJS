const whitelistService = require('../services/whitelist-cache-service');

module.exports = async (req, res, next) => {
  if (req.tokenData) {
    try {
      const { userId, deviceId, rule } = req.tokenData;
      const isWhitelisted = await whitelistService.isWhitelistedToken(
        userId,
        deviceId
      );

      if (isWhitelisted) {
        req.user = { userId, deviceId, rule };
      }
    } catch (err) {
      return next(err);
    }
  }

  next();
};
