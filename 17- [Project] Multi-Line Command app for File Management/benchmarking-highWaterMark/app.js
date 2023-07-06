const ReadLine = require('../utils/readLineModule');

(async () => {
  for (let i = 0; i < 21; i++) {
    const lineReader = new ReadLine(
      './single-Line commands.txt',
      Math.pow(2, i)
    );

    console.time(`highWaterMark_${Math.pow(2, i)}`);
    while (lineReader.hasNext()) await lineReader.getNext();
    console.timeEnd(`highWaterMark_${Math.pow(2, i)}`);
  }
})();
