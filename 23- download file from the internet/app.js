const fs = require('fs');
const download = require('download');

(async () => {
  const url = 'https://avatars.githubusercontent.com/u/122023914?v=4';
  const writableStream = fs.createWriteStream('myImage.temp.jpg');

  writableStream.on('finish', async () => {
    await fs.promises.rename('myImage.temp.jpg', 'myImage.jpg');

    console.log(
      'The file has been downloaded successfully! Have a great time :)'
    );
  });
  download(url).pipe(writableStream);
})();
