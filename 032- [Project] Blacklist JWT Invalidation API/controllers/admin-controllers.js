const deviceModel = require('../models/device-model');
const jwtInvalidationService = require('../services/jwt-invalidation-service');

const invalidateUsers = async (req, res, next) => {
  const type = req.params.type;
  const userId = req.params.userId;
  let done = null;

  if (type === 'singleUser') {
    const tokenExpiration = await deviceModel.getMaxTokenExpirationFromUserId(
      userId
    );
    done = await jwtInvalidationService.invalidateUserAllDevices(
      userId,
      tokenExpiration
    );
  } else if (type === 'allUsers') {
    const tokenExpiration = await deviceModel.getMaxTokenExpiration();
    done = await jwtInvalidationService.invalidateAllUsersDevices(
      tokenExpiration
    );
  } else {
    return next(new Error('Not valid path!'));
  }

  if (!done) return next(new Error('Unable to invalidate tokens!'));

  res.send({ msg: 'Invalidate tokens successfully :)' });
};

module.exports = {
  invalidateUsers,
};
