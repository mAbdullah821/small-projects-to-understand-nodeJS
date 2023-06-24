const userModel = require('../models/user-model');
const deviceModel = require('../models/device-model');
const jwtInvalidationService = require('../services/jwt-invalidation-service');
const whitelistService = require('../services/whitelist-cache-service');

const sayHiUser = async (req, res) => {
  let username = 'stranger';
  let deviceName = 'somewhere';
  let rule = undefined;

  try {
    if (req.user) {
      const user = await userModel.getUserFromUserId(req.user.userId);
      deviceName = await deviceModel.getDeviceNameFromDeviceId(
        req.user.deviceId
      );

      username = user.username;
      rule = req.user.rule;
    }

    res
      .status(200)
      .send({
        status: 'Success',
        msg: `Hi, '${username}' from [${deviceName}] with (${rule}) privilege :)`,
      });
  } catch (err) {
    console.log(err);
    req.statusCode = 500;
    next(new Error('Internal Database Error!'));
  }
};

const logout = async (req, res, next) => {
  const type = req.params.type;
  const userId = req.user.userId;
  const deviceId = req.user.deviceId;
  let done = null;

  try {
    const tokenExpiration = await deviceModel.getTokenExpirationFromDeviceId(
      deviceId
    );

    if (type === 'singleDevice') {
      done = await jwtInvalidationService.invalidateUserDevice(
        userId,
        deviceId,
        tokenExpiration
      );

      await whitelistService.removeSingleUserTokenFromWhitelist(
        userId,
        deviceId
      );
    } else if (type === 'allDevices') {
      done = await jwtInvalidationService.invalidateUserAllDevices(
        userId,
        tokenExpiration
      );

      await whitelistService.removeAllUserTokensFromWhitelist(userId);
    } else {
      req.statusCode = 404;
      throw new Error('Not valid path!');
    }

    if (!done) {
      req.statusCode = 500;
      throw new Error('Unable to invalidate token!');
    }

    res
      .status(204)
      .send({ status: 'Success', msg: 'Logged out successfully :)' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sayHiUser,
  logout,
};
