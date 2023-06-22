const sleep = require('../utils/sleep');
const userModel = require('../models/user-model');
const deviceModel = require('../models/device-model');
const tokenService = require('../services/token-service');
const jwtInvalidationService = require('../services/jwt-invalidation-service');

const signup = async (req, res, next) => {
  try {
    const { username } = req.body;
    const userId = await userModel.addNewUser(username);
    res.send({
      msg: 'Account created successfully :)',
      user: {
        id: userId,
        username,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, deviceName } = req.body;
    const user = await userModel.getUserFromUsername(username);

    if (!user) throw new Error('The user is not registered!');

    const device = await deviceModel.getDeviceByUserIdAndName(
      user.id,
      deviceName
    );

    // Is previous token is still valid?:
    //          (Yes --|--> action) blacklisted it before create new token.
    if (device && device.tokenExp * 1000 > Date.now()) {
      const done = await jwtInvalidationService.invalidateUserDevice(
        user.id,
        device.id,
        device.tokenExp,
        true
      );

      if (!done) throw new Error('Unable to invalidate device token!');
    }

    let deviceId = null;

    if (!device) {
      deviceId = await deviceModel.addNewDevice(deviceName, user.id);
    }

    deviceId = device?.id ?? deviceId;

    const { token, expireAt } = await tokenService.issueToken({
      userId: user.id,
      deviceId: deviceId,
      rule: user.rule,
    });

    const affectedRows = await deviceModel.updateTokenExpirationForDeviceId(
      deviceId,
      expireAt
    );

    if (!affectedRows)
      throw new Error('Cannot update token expiration for that device!');

    res.send({ msg: 'Successful login :)', token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  signup,
  login,
};
