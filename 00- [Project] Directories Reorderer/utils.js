const { startFromOrder, increaseBy, paddingLength } = require('./config');

const getDirectoryOrder = (directoryName, returnStringOrder = false) => {
  const orderRegex = /^[0-9.]+/;
  const stringOrder = directoryName.match(orderRegex)[0];

  if (returnStringOrder) return stringOrder;

  return Number(stringOrder);
};

const getNewDirectoryName = (directoryName, increaseBy) => {
  const stringOrder = getDirectoryOrder(directoryName, true);
  const stringOrderIntegerPart = stringOrder.split('.')[0];
  const stringOrderFractionPart = stringOrder.split('.')[1];

  const newOrder = Number(stringOrderIntegerPart) + increaseBy;
  let paddedOrder = String(newOrder).padStart(paddingLength, '0');

  if (stringOrderFractionPart) paddedOrder += `.${stringOrderFractionPart}`;

  const dashSymbolIndex = directoryName.indexOf('-');
  const newDirectoryName = paddedOrder + directoryName.slice(dashSymbolIndex);

  return newDirectoryName;
};

const getAllNewDirectoryNames = (directories) => {
  const newNames = [];

  for (let i = 0; i < directories.length; i++) {
    const directoryName = directories[i];
    const order = getDirectoryOrder(directoryName);

    if (order < startFromOrder) {
      newNames.push(directoryName);
      continue;
    }

    const newDirectoryName = getNewDirectoryName(directoryName, increaseBy);
    newNames.push(newDirectoryName);
  }

  return newNames;
};

const isOrderedDirectoryName = (directoryName) => {
  const orderedNameRegex = /^[ ]*[0-9.]+- /;
  return orderedNameRegex.test(directoryName);
};

module.exports = {
  isOrderedDirectoryName,
  getAllNewDirectoryNames,
};
