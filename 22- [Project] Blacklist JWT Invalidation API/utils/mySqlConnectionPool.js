const mysql = require('mysql2/promise');
const {
  MYSQL_DATABASE,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = require('./config');

const connectionPool = mysql.createPool({
  database: MYSQL_DATABASE,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});

module.exports = connectionPool;
