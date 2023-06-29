const fs = require('fs');

// ----------------- Configuration Variables -----------------

const fileToShuffle = './to-shuffle.txt';
const reshuffleRetries = 333;
const maxInt = 1e8;
const endLine = '\r\n';

// -----------------------------------------------------------

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function insertSubstring(substring, str, position) {
  if (position > str.length) return str + substring;
  else if (position <= 0) return substring + str;
  else return str.slice(0, position) + substring + str.slice(position);
}

const generateShuffledFilePath = (filePath) => {
  const extensionIndex = filePath.lastIndexOf('.');
  return insertSubstring('-[ Shuffled ]', filePath, extensionIndex);
};

const sortFunc = (a, b) => a[0] - b[0];

const shuffle = () => {
  const shuffledData = fs
    .readFileSync(fileToShuffle)
    .toString()
    .split('\r\n')
    .map((line) => [getRandomInt(maxInt), line])
    .sort(sortFunc)
    .reduce((acc, line) => acc + line[1] + endLine, '')
    .slice(0, -2);

  const shuffledFilePath = generateShuffledFilePath(fileToShuffle);

  fs.writeFileSync(shuffledFilePath, shuffledData);
};

for (let i = 0; i < reshuffleRetries; i++) shuffle();
