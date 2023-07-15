const WriteStream = require('./writeStream');

const writableStream = new WriteStream({
  highWaterMark: 4 * 1024, // 4-KB
  file: 'writeTest.txt',
});

console.time('Writing task completed in');

for (let i = 0; i < 1e6; i++) {
  writableStream.write(`^${i}$`);
}

writableStream.end();

writableStream.on('finish', () => {
  console.timeEnd('Writing task completed in');
});
