const connectionPool = require('../utils/mySqlConnectionPool');

const addNewUser = async (username) => {
  const query = 'INSERT INTO users (username) VALUES (?)';
  const [result] = await connectionPool.execute(query, [username]);
  return result.insertId;
};

const getUserFromUserId = async (userId) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const [result] = await connectionPool.execute(query, [userId]);
  return result[0];
};

const getUserFromUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  const [result] = await connectionPool.execute(query, [username]);
  return result[0];
};

module.exports = {
  addNewUser,
  getUserFromUserId,
  getUserFromUsername,
};
