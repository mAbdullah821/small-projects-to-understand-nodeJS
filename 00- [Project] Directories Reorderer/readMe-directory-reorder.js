const fs = require('fs');
const { isOrderedDirectoryName, getAllNewDirectoryNames } = require('./utils');
const { rootPath } = require('./config');

const readMePath = rootPath + '/README.md';
let readMeData = fs.readFileSync(readMePath).toString();

const directories = readMeData
  .split('|')
  .filter(isOrderedDirectoryName)
  .map((directoryName) => directoryName.trimStart());

const newDirectoryNames = getAllNewDirectoryNames(directories);

for (let i = 0; i < newDirectoryNames.length; i++) {
  if (directories[i] === newDirectoryNames[i]) continue;

  readMeData = readMeData.replace(directories[i], newDirectoryNames[i]);
}

fs.writeFileSync(readMePath, readMeData);
