const { MAX_COMMAND_DISPLAY_LENGTH } = require('./config');

module.exports = (string) => {
  if (string.length > MAX_COMMAND_DISPLAY_LENGTH) {
    return string.slice(0, MAX_COMMAND_DISPLAY_LENGTH).trimEnd() + '...';
  }
  return string;
};
