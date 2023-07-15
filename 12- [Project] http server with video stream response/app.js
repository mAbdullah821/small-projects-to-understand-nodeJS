const http = require('http');
const fs = require('fs');
const { promisify } = require('util');
const status = promisify(fs.stat);

const PORT = 8000;
http
  .createServer(async (req, res) => {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream(__dirname + '/index.html').pipe(res);
    } else if (req.url === '/video') {
      if (!req.headers.range) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Require range header');
        return;
      }

      const chunkSize = 64 * 1024;
      const size = (await status(__dirname + '/Natural Mountain.mp4')).size;
      const range = req.headers.range.replace(/bytes=/, '').split('-');
      const start = Number(range[0]);
      const end = Math.min(start + chunkSize, size);

      const headers = {
        'Content-Type': 'video/mp4',
        'Content-Length': end - start + 1,
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Accept-Ranges': 'bytes',
      };
      res.writeHead(206, headers);
      fs.createReadStream(__dirname + '/Natural Mountain.mp4', {
        start,
        end,
      }).pipe(res);
    }
  })
  .listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
