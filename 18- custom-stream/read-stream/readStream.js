const { Readable } = require('stream');
const fs = require('fs');

class ReadStream extends Readable {
  constructor({ highWaterMark, file }) {
    super({ highWaterMark });

    this.file = file;
    this.fd = null;
    this.readsCount = 0;
  }

  _construct(callback) {
    fs.open(this.file, (err, fd) => {
      if (err) return callback(err);

      this.fd = fd;
      callback();
    });
  }

  _read(size) {
    const buff = Buffer.alloc(size);

    fs.read(this.fd, buff, 0, size, null, (err, bytesRead) => {
      if (err) return this.destroy(err);

      this.readsCount += 1;
      this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
    });
  }

  _destroy(error, callback) {
    if (this.fd) {
      fs.close(this.fd, (err) => {
        if (error || err) return callback(err || error);

        console.log('Number of reads:', this.readsCount);
        callback();
      });
    } else callback(error);
  }
}

module.exports = ReadStream;
