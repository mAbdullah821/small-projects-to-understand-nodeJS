const ReadStream = require('./readStream');
const fs = require('fs');

console.time('Reading task completed in');

const readableStream = new ReadStream({
  highWaterMark: 4 * 1024, // 4-KB
  file: 'readTest.txt',
});

const writableStream = fs.createWriteStream('writeTest.txt');

readableStream.pipe(writableStream);

readableStream.on('end', () => {
  console.timeEnd('Reading task completed in');
});
