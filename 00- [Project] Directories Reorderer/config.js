const rootPath = '..';
const startFromOrder = 1;
const increaseBy = 0; // can be [positive (or) 0 (or) negative]
const paddingLength = 2;
const orderedDirectoryNameRegex = /[0-9.]+-( |%20)/;

module.exports = {
  rootPath,
  startFromOrder,
  increaseBy,
  paddingLength,
  orderedDirectoryNameRegex,
};
