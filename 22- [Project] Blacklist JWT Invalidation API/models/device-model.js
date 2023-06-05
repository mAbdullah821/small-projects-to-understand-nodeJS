const connectionPool = require('../utils/mySqlConnectionPool');

const addNewDevice = async (deviceName, userId) => {
  const query = 'INSERT INTO devices (name, userId) VALUES (?, ?)';
  const [result] = await connectionPool.execute(query, [deviceName, userId]);
  return result.insertId;
};

const updateTokenExpirationForDeviceId = async (deviceId, tokenExpiration) => {
  const query = 'UPDATE devices SET tokenExp = ? WHERE id = ?';
  const [result] = await connectionPool.execute(query, [
    tokenExpiration,
    deviceId,
  ]);
  return result.affectedRows;
};

const getDeviceNameFromDeviceId = async (deviceId) => {
  const query = 'SELECT name FROM devices WHERE id = ?';
  const [result] = await connectionPool.execute(query, [deviceId]);
  return result[0]?.name ?? null;
};

const getDeviceByUserIdAndName = async (userId, deviceName) => {
  const query = 'SELECT * FROM devices WHERE userId = ? and name = ?';
  const [result] = await connectionPool.execute(query, [userId, deviceName]);
  return result[0];
};

const getTokenExpirationFromDeviceId = async (deviceId) => {
  const query = 'SELECT tokenExp FROM devices WHERE id = ?';
  const [result] = await connectionPool.execute(query, [deviceId]);
  return result[0]?.tokenExp ?? null;
};

const getMaxTokenExpirationFromUserId = async (userId) => {
  const query =
    'SELECT MAX(tokenExp) AS tokenExp FROM devices WHERE userId = ?';
  const [result] = await connectionPool.execute(query, [userId]);
  return result[0]?.tokenExp ?? null;
};

const getMaxTokenExpiration = async () => {
  const query = 'SELECT MAX(tokenExp) As tokenExp FROM devices';
  const [result] = await connectionPool.execute(query);
  return result[0]?.tokenExp ?? null;
};

module.exports = {
  addNewDevice,
  updateTokenExpirationForDeviceId,
  getDeviceNameFromDeviceId,
  getDeviceByUserIdAndName,
  getTokenExpirationFromDeviceId,
  getMaxTokenExpirationFromUserId,
  getMaxTokenExpiration,
};
