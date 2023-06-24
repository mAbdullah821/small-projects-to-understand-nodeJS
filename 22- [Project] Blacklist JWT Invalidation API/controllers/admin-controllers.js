const deviceModel = require('../models/device-model');
const jwtInvalidationService = require('../services/jwt-invalidation-service');
const whitelistService = require('../services/whitelist-cache-service');

const invalidateUsers = async (req, res, next) => {
  const type = req.params.type;
  const userId = req.params.userId;
  let done = null;

  try {
    if (type === 'singleUser') {
      const tokenExpiration = await deviceModel.getMaxTokenExpirationFromUserId(
        userId
      );
      done = await jwtInvalidationService.invalidateUserAllDevices(
        userId,
        tokenExpiration
      );

      await whitelistService.removeAllUserTokensFromWhitelist(userId);
    } else if (type === 'allUsers') {
      const tokenExpiration = await deviceModel.getMaxTokenExpiration();
      done = await jwtInvalidationService.invalidateAllUsersDevices(
        tokenExpiration
      );

      await whitelistService.removeAllUsersTokensFromWhitelist();
    } else {
      req.statusCode = 404;
      throw new Error('Not valid path!');
    }

    if (!done) {
      req.statusCode = 500;
      throw new Error('Unable to invalidate tokens!');
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  invalidateUsers,
};
