const connectionPool = require('../utils/mySqlConnectionPool');

const insertNewTokenOrUpdateIfExists = async (
  userId,
  deviceId,
  tokenExpiration,
  pastTimestamp = false,
  transaction = null
) => {
  const connection = transaction || connectionPool;
  const query = `
  INSERT INTO blacklist (userId, deviceId, blacklistedAt, tokenExp)
  VALUES (?, ?, UNIX_TIMESTAMP() - ?, ?) AS new
  ON DUPLICATE KEY UPDATE 
  blacklistedAt = new.blacklistedAt, tokenExp = new.tokenExp
  `;

  const [result] = await connection.execute(query, [
    userId,
    deviceId,
    pastTimestamp ? 1 : 0,
    tokenExpiration,
  ]);
  return result.affectedRows;
};

const deleteAllTokensForUserId = async (userId, transaction = null) => {
  const connection = transaction || connectionPool;
  const query = 'DELETE FROM blacklist WHERE userId = ?';
  const [result] = await connection.execute(query, [userId]);
  return result.affectedRows;
};

const deleteAllTokens = async (transaction = null) => {
  const connection = transaction || connectionPool;
  const query = 'TRUNCATE TABLE blacklist';
  const [result] = await connection.execute(query);
  return result.affectedRows;
};

const getBlacklistedAt = async (userId, deviceId) => {
  const query =
    'SELECT blacklistedAt FROM blacklist WHERE userId = ? and deviceId = ?';
  const [result] = await connectionPool.execute(query, [userId, deviceId]);

  return result[0]?.blacklistedAt ?? null;
};

module.exports = {
  insertNewTokenOrUpdateIfExists,
  deleteAllTokensForUserId,
  deleteAllTokens,
  getBlacklistedAt,
};
