const fs = require('fs');
const dataSplitter = require('./dataSplitter');

// +++++++++++++++++++++++++++++++++++++++++
// ---------------- Testing ----------------
// +++++++++++++++++++++++++++++++++++++++++

const readStream1 = fs.createReadStream('test1.txt', {
  highWaterMark: 2,
});
dataSplitter(readStream1, ' ', ' ');

// ------------------------------------------------------------------------
setTimeout(() => {
  const readStream2 = fs.createReadStream('test2.txt', {
    highWaterMark: 2,
  });
  dataSplitter(readStream2, '&', '&');
}, 1000);

// ------------------------------------------------------------------------
setTimeout(() => {
  const readStream3 = fs.createReadStream('test3.txt', {
    highWaterMark: 2,
  });
  dataSplitter(readStream3, '<', '&');
}, 2000);
