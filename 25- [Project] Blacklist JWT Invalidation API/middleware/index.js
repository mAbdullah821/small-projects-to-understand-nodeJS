const extractTokenData = require('./extract-token-data');
const isWhitelistedToken = require('./is-whitelisted-token');
const validateToken = require('./validate-token');
const isTokenValid = require('./is-token-valid');
const isAdmin = require('./is-admin');

module.exports = {
  extractTokenData,
  isWhitelistedToken,
  validateToken,
  isTokenValid,
  isAdmin,
};
