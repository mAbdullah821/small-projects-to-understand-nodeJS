const userModel = require('../models/user-model');
const deviceModel = require('../models/device-model');
const jwtInvalidationService = require('../services/jwt-invalidation-service');

const sayHiUser = async (req, res) => {
  let username = 'stranger';
  let deviceName = 'somewhere';
  let rule = undefined;

  if (req.user) {
    const user = await userModel.getUserFromUserId(req.user.userId);
    deviceName = await deviceModel.getDeviceNameFromDeviceId(req.user.deviceId);

    username = user.username;
    rule = req.user.rule;
  }

  res.send({
    msg: `Hi, '${username}' from [${deviceName}] with (${rule}) privilege :)`,
  });
};

const logout = async (req, res, next) => {
  const type = req.params.type;
  const userId = req.user.userId;
  const deviceId = req.user.deviceId;
  let done = null;

  const tokenExpiration = await deviceModel.getTokenExpirationFromDeviceId(
    deviceId
  );

  if (type === 'singleDevice')
    done = await jwtInvalidationService.invalidateUserDevice(
      userId,
      deviceId,
      tokenExpiration
    );
  else if (type === 'allDevices')
    done = await jwtInvalidationService.invalidateUserAllDevices(
      userId,
      tokenExpiration
    );
  else return next(new Error('Not valid path!'));

  if (!done) return next(new Error('Unable to invalidate token!'));

  res.send({ msg: 'Logged out successfully :)' });
};

module.exports = {
  sayHiUser,
  logout,
};
