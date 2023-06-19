const jwt = require('../utils/_jwt');
const { JWT_SECRET, JWT_TTL } = require('../utils/config');
const jwtInvalidationService = require('./jwt-invalidation-service');

const getExpiryTime = (TTLInSeconds) => {
  return Math.floor(Date.now() / 1000) + TTLInSeconds;
};

const issueToken = async (payload) => {
  const expireAt = getExpiryTime(JWT_TTL);
  const token = await jwt.sign({ exp: expireAt, data: payload }, JWT_SECRET);
  return { token, expireAt };
};

const validateToken = async (token) => {
  let valid = false;
  let data = null;

  try {
    const payload = await jwt.verify(token, JWT_SECRET);

    const { userId, deviceId } = payload.data;
    const issuedAt = payload.iat;

    const userDeviceBlacklistedAt =
      await jwtInvalidationService.getUserDeviceBlacklistedAt(userId, deviceId);
    const userAllDevicesBlacklistedAt =
      await jwtInvalidationService.getUserAllDevicesBlacklistedAt(userId);
    const allUsersDevicesBlacklistedAt =
      await jwtInvalidationService.getAllUsersDevicesBlacklistedAt();

    const blacklistedAt = Math.max(
      userDeviceBlacklistedAt,
      userAllDevicesBlacklistedAt,
      allUsersDevicesBlacklistedAt
    );

    if (blacklistedAt && issuedAt <= blacklistedAt)
      throw new Error('Blacklisted token');

    valid = true;
    data = payload.data;
  } catch (err) {
    console.log(err);
  } finally {
    return { valid, data };
  }
};

module.exports = {
  issueToken,
  validateToken,
};
