const rootPath = '..';
const startFromOrder = 1;
const increaseBy = 10; // can be [positive (or) 0 (or) negative]
const paddingLength = 3;
const orderedDirectoryNameRegex = /[0-9.]+-( |%20)/;

module.exports = {
  rootPath,
  startFromOrder,
  increaseBy,
  paddingLength,
  orderedDirectoryNameRegex,
};
