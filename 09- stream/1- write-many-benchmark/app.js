const fs = require('fs');

const asyncAwaitAppend = async (numberOfWrites) => {
  console.time(`Append to file - async / await`);

  const fileHandle = await fs.promises.open(
    `./${numberOfWrites}-writes-async-await.txt`,
    'w'
  );

  for (let i = 0; i < numberOfWrites; i++) {
    await fileHandle.write(` ${i} `);
  }

  fileHandle.close();

  console.timeEnd(`Append to file - async / await`);
};

const asyncCallbackAppend = (numberOfWrites) => {
  console.time(`Append to file - async / callback`);

  fs.open(`./${numberOfWrites}-writes-async-callback.txt`, 'w', (err, fd) => {
    for (let i = 0; i < numberOfWrites; i++) {
      fs.writeSync(fd, ` ${i} `);
    }
  });

  console.timeEnd(`Append to file - async / callback`);
};

const memoryStringAppend = async (numberOfWrites) => {
  console.time('Append to file - memory string');

  let allData = '';
  for (let i = 0; i < numberOfWrites; i++) {
    allData += 'a';
  }

  await fs.promises.writeFile(
    `./${numberOfWrites}-writes-memory-string.txt`,
    allData
  );

  console.timeEnd('Append to file - memory string');
};

const streamAppend = (numberOfWrites) => {
  console.time(`Append to file - stream`);

  const stream = fs.createWriteStream(`./${numberOfWrites}-writes-stream.txt`);

  // console.log(stream.writableHighWaterMark);

  let i = 0;
  const loopWrites = () => {
    while (i < numberOfWrites && stream.write(Buffer.from(` ${i} `, 'utf8')))
      i++;
    if (i >= numberOfWrites) stream.end();
  };

  loopWrites();
  stream.on('drain', loopWrites);
  stream.on('finish', () => {
    console.timeEnd(`Append to file - stream`);
  });
};

/**
 * Conduct benchmarks to evaluate efficiency of various
 *  data writing techniques, including:
 *
 *    > Async / Await.
 *    > Async / Callback.
 *    > Memory String.
 *    > Stream.
 */

const numberOfWrites = 1e5;
(async () => {
  await asyncAwaitAppend(numberOfWrites);
  asyncCallbackAppend(numberOfWrites);
  await memoryStringAppend(numberOfWrites);
  streamAppend(numberOfWrites);
})();
