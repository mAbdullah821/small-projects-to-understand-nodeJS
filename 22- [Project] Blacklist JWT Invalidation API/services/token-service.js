const jwt = require('../utils/_jwt');
const { JWT_SECRET, JWT_TTL } = require('../utils/config');
const jwtInvalidationService = require('./jwt-invalidation-service');

const getExpiryTime = (TTLInSeconds) => {
  const millisecondsInOneSecond = 1000;
  return Math.floor(Date.now() / millisecondsInOneSecond) + TTLInSeconds;
};

const issueToken = async (payload) => {
  const expireAt = getExpiryTime(JWT_TTL);
  const token = await jwt.sign({ exp: expireAt, ...payload }, JWT_SECRET);
  return { token, expireAt };
};

const validateToken = async (tokenData) => {
  const { userId, deviceId, rule, iat: issuedAt } = tokenData;

  const blacklistedAtArr = [];

  blacklistedAtArr.push(
    jwtInvalidationService.getUserDeviceBlacklistedAt(userId, deviceId)
  );
  blacklistedAtArr.push(
    jwtInvalidationService.getUserAllDevicesBlacklistedAt(userId)
  );
  blacklistedAtArr.push(
    jwtInvalidationService.getAllUsersDevicesBlacklistedAt()
  );

  let result;

  try {
    result = await Promise.all(blacklistedAtArr);
  } catch (err) {
    console.log(err);
    throw new Error('Internal Database server error!');
  }

  const blacklistedAt = Math.max(...result);

  if (blacklistedAt && issuedAt <= blacklistedAt)
    throw new Error('Blacklisted token');

  return { userId, deviceId, rule };
};

module.exports = {
  issueToken,
  validateToken,
};
