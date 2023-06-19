const connectionPool = require('../utils/mySqlConnectionPool');
const { ALL } = require('../utils/config');
const blacklistModel = require('../models/blacklist-model');

const getUserDeviceBlacklistedAt = async (userId, deviceId) => {
  return await blacklistModel.getBlacklistedAt(userId, deviceId);
};

const getUserAllDevicesBlacklistedAt = async (userId) => {
  return await blacklistModel.getBlacklistedAt(userId, ALL);
};

const getAllUsersDevicesBlacklistedAt = async () => {
  return await blacklistModel.getBlacklistedAt(ALL, ALL);
};

const invalidateUserDevice = async (
  userId,
  deviceId,
  tokenExpiration,
  pastTimestamp = false
) => {
  let completedWithNoError = false;
  try {
    await blacklistModel.insertNewTokenOrUpdateIfExists(
      userId,
      deviceId,
      tokenExpiration,
      pastTimestamp
    );
    completedWithNoError = true;
  } catch (err) {
    console.log(err);
  } finally {
    return completedWithNoError;
  }
};

const invalidateUserAllDevices = async (userId, tokenExpiration) => {
  let completedWithNoError = false;
  const connection = await connectionPool.getConnection();
  try {
    await connection.beginTransaction();

    await blacklistModel.deleteAllTokensForUserId(userId, connection);
    await blacklistModel.insertNewTokenOrUpdateIfExists(
      userId,
      ALL,
      tokenExpiration,
      false,
      connection
    );

    await connection.commit();
    completedWithNoError = true;
  } catch (err) {
    await connection.rollback();
    console.log(err);
  } finally {
    await connection.release();
    return completedWithNoError;
  }
};

const invalidateAllUsersDevices = async (tokenExpiration) => {
  let completedWithNoError = false;
  const connection = await connectionPool.getConnection();
  try {
    await connection.beginTransaction();

    await blacklistModel.deleteAllTokens(connection);
    await blacklistModel.insertNewTokenOrUpdateIfExists(
      ALL,
      ALL,
      tokenExpiration,
      false,
      connection
    );

    await connection.commit();
    completedWithNoError = true;
  } catch (err) {
    await connection.rollback();
    console.log(err);
  } finally {
    await connection.release();
    return completedWithNoError;
  }
};

module.exports = {
  getUserDeviceBlacklistedAt,
  getUserAllDevicesBlacklistedAt,
  getAllUsersDevicesBlacklistedAt,
  invalidateUserDevice,
  invalidateUserAllDevices,
  invalidateAllUsersDevices,
};
