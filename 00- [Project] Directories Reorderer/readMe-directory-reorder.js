const fs = require('fs');
const { getAllNewDirectoryNames } = require('./utils');
const { rootPath, orderedDirectoryNameRegex } = require('./config');

const readMePath = rootPath + '/README.md';
let readMeData = fs.readFileSync(readMePath).toString();

const directories = readMeData
  .split('|')
  .map((directoryName) => directoryName.trimStart())
  .filter((directoryName) => orderedDirectoryNameRegex.test(directoryName));

const newDirectoryNames = getAllNewDirectoryNames(directories);

for (let i = 0; i < newDirectoryNames.length; i++) {
  if (directories[i] === newDirectoryNames[i]) continue;

  readMeData = readMeData.replace(directories[i], newDirectoryNames[i]);
}

fs.writeFileSync(readMePath, readMeData);
