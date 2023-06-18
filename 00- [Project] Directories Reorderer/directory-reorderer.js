const fs = require('fs');
const { isOrderedDirectoryName, getAllNewDirectoryNames } = require('./utils');
const { rootPath } = require('./config');

const directories = fs
  .readdirSync(rootPath, { withFileTypes: true })
  .filter((file) => file.isDirectory() && isOrderedDirectoryName(file.name))
  .map((directory) => directory.name);

const newDirectoryNames = getAllNewDirectoryNames(directories);

for (let i = newDirectoryNames.length - 1; i >= 0; i--) {
  if (directories[i] === newDirectoryNames[i]) continue;

  fs.renameSync(
    `${rootPath}/${directories[i]}`,
    `${rootPath}/${newDirectoryNames[i]}`
  );
}
