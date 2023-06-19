const fs = require('fs');

const readableStream = fs.createReadStream(__dirname + '/textToReadFrom.txt', {
  // encoding: 'utf8',
  highWaterMark: 16 * 1024,
});

const writableStream = fs.createWriteStream(__dirname + '/textToWriteTo.txt', {
  flags: 'a', // append, Default is 'r' (override).
});
let order = 1;
readableStream.on('data', (chunk) => {
  console.log(`the ${order++}'th chunk length: `, chunk.length);
  writableStream.write(chunk);
});
