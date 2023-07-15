const DuplexStream = require('./duplexStream');

const duplexFile = 'duplexTest.txt';
const highWaterMark = 4 * 1024; // 4-KB

const stream = new DuplexStream({
  readableHighWaterMark: highWaterMark,
  writableHighWaterMark: highWaterMark,
  readFile: duplexFile,
  writeFile: duplexFile,
});

stream.write('+\x1b[36m-----------------------\x1b[0m+\n');
stream.write('|      Starting...      |\n');
stream.write('+\x1b[36m-----------------------\x1b[0m+\n');
stream.write('Hello World_1\n');
stream.write('Hello World_2\n');
stream.write('Hello World_3\n');
stream.write('Hello World_4\n');
stream.end('Hello World_5 (End)\n');

stream.on('data', (chunks) => {
  console.log(chunks.toString());
});

// +-------------------------------------+

stream.on('data', (chunks) => {
  console.log(chunks.toString());
});
