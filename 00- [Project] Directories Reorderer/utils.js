const {
  startFromOrder,
  increaseBy,
  leadingZerosLength,
  orderedDirectoryNameRegex,
} = require('./config');

const getDirectoryOrder = (directoryName, returnStringOrder = false) => {
  const numberRegex = /^[0-9.]+/;
  let stringOrder = directoryName.match(orderedDirectoryNameRegex)[0];
  stringOrder = stringOrder.match(numberRegex)[0];

  if (returnStringOrder) return stringOrder;

  return Number(stringOrder);
};

const getNewDirectoryName = (directoryName, increaseBy) => {
  const stringOrder = getDirectoryOrder(directoryName, true);
  const stringOrderIntegerPart = stringOrder.split('.')[0];
  const stringOrderFractionPart = stringOrder.split('.')[1];

  const newOrder = Number(stringOrderIntegerPart) + increaseBy;
  let paddedOrder = String(newOrder).padStart(leadingZerosLength, '0');

  if (stringOrderFractionPart) paddedOrder += `.${stringOrderFractionPart}`;

  const startFrom = directoryName.search(orderedDirectoryNameRegex);
  const dashSymbolIndex = directoryName.indexOf('-', startFrom);
  const newDirectoryName =
    directoryName.slice(0, startFrom) +
    paddedOrder +
    directoryName.slice(dashSymbolIndex);

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

module.exports = {
  getAllNewDirectoryNames,
};
