const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');
const { promisify } = require('util');

const readableStream = fs.createReadStream(__dirname + '/textToReadFrom.txt');
const writableStream = fs.createWriteStream(__dirname + '/textToWriteTo.txt');
const compressibleStream = fs.createWriteStream(__dirname + '/text.txt.gz');
const compress = zlib.createGzip();

//------------------------- (1) -------------------------
readableStream.pipe(writableStream);
readableStream.pipe(compress).pipe(compressibleStream);

//------------------------- (2) -------------------------
pipeline(readableStream, writableStream, (err) => {
  if (err) console.log(err);
  console.log('Finish streaming');
});

pipeline(readableStream, compress, compressibleStream, (err) => {
  if (err) console.log(err);
  console.log('Finish compressing');
});

//------------------------- (3) -------------------------
const pipe = promisify(pipeline);

(async () => {
  try {
    await pipe(readableStream, writableStream);
    console.log('Finish streaming');
  } catch (err) {
    console.log(err);
  }
})();

(async () => {
  try {
    await pipe(readableStream, compress, compressibleStream);
    console.log('Finish compressing');
  } catch (err) {
    console.log(err);
  }
})();
