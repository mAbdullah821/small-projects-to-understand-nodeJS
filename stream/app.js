const fs = require('fs');

(async () => {
  // console.time('1e6 Append to file: async');

  // // : 1:00.00 (m:ss.mmm)
  // const fileHandle = await fs.promises.open('./oneMillion-async.txt', 'w');
  // for (let i = 0; i < 1e6; i++) {
  //   await fileHandle.write(` ${i} `);
  // }

  // fileHandle.close();

  // console.timeEnd('1e6 Append to file: async');
  // ---------------------
  console.time('1e6 Append to file - callback');

  // : 0.300ms
  fs.open('./oneMillion-callback.txt', 'w', (err, fd) => {
    for (let i = 0; i < 1e6; i++) {
      fs.writeSync(fd, ` ${i} `);
    }
  });

  console.timeEnd('1e6 Append to file - callback');
  // ---------------------
  console.time('1 Append to file - memory string');

  // : 4.500s
  let allData = '';
  for (let i = 0; i < 1e6; i++) {
    allData += 'a';
  }
  await fs.promises.writeFile('./oneMillion-append-once.txt', allData);

  console.timeEnd('1 Append to file - memory string');

  // ---------------------
  console.time('1e6 Append to file - stream');

  // : 1.100s
  const stream = fs.createWriteStream('./oneMillion-stream');
  for (let i = 0; i < 1e6; i++) {
    const buffer = Buffer.from(` ${i} `, 'utf8');
    stream.write(buffer);
  }

  console.timeEnd('1e6 Append to file - stream');
})();
