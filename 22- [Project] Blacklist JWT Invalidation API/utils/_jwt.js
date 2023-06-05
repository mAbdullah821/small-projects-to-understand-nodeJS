const _jwt = require('jsonwebtoken');
const util = require('util');

const jwt = {
  sign: util.promisify(_jwt.sign),
  verify: util.promisify(_jwt.verify),
};

module.exports = jwt;
