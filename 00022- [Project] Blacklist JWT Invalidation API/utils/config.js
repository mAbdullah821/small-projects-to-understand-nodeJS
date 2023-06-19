const containerMysql = process.env.containerMysql === 'true';

const MYSQL_DATABASE = 'nodeAppDB';
const MYSQL_PORT = containerMysql ? '3303' : '3306'; // container:localhost
const MYSQL_USER = containerMysql ? 'hello' : 'local_mysql_user'; // container:localhost
const MYSQL_PASSWORD = containerMysql ? 'world' : 'local_mysql_password'; // container:localhost

const SERVER_PORT = 3030;

const JWT_SECRET = 'jwtSecret';
const JWT_TTL = 1 * 60 * 60; // 1 hour in seconds

ALL = -1;

module.exports = {
  MYSQL_DATABASE,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  SERVER_PORT,
  JWT_SECRET,
  JWT_TTL,
  ALL,
};
