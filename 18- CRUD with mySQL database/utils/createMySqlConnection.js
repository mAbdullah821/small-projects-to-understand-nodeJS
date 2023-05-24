const mysql = require('mysql2/promise');

module.exports = () =>
  mysql.createConnection({
    user: 'hello',
    password: 'world',
    database: 'understand_nodejs_database',
    port: '3303',
  });

// -----> this also work
// module.exports = mysql.createConnection({
//   user: 'hello',
//   password: 'world',
//   database: 'understand_nodejs_database',
//   port: '3303',
// });
