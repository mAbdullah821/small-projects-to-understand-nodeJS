const tokenService = require('../services/token-service');
const whitelistService = require('../services/whitelist-cache-service');

module.exports = async (req, res, next) => {
  if (req.tokenData && !req.user) {
    try {
      req.user = await tokenService.validateToken(req.tokenData);

      const { userId, deviceId } = req.user;
      await whitelistService.addUserTokenToWhitelist(userId, deviceId);
    } catch (err) {
      req.statusCode = err.message.startsWith('Blacklisted') ? 401 : 500;
      return next(err);
    }
  }

  next();
};
