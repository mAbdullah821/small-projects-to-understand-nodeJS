const { Writable } = require('stream');
const fs = require('fs');

class WriteStream extends Writable {
  constructor({ highWaterMark, file }) {
    super();

    this.file = file;
    this.fd = null;
    this.data = '';
    this.highWaterMark = highWaterMark;
    this.writesCount = 0;
  }

  _construct(callback) {
    this.fd = fs.open(this.file, 'w', (err, fd) => {
      if (err) return callback(err);

      this.fd = fd;
      callback();
    });
  }

  _write(chunk, encoding, callback) {
    this.data += chunk;

    // Using a buffer is much faster than the plain text
    if (this.data.length >= this.highWaterMark) {
      fs.write(this.fd, Buffer.from(this.data), (err) => {
        if (err) return callback(err);

        this.writesCount += 1;
        this.data = '';
        callback();
      });
    } else callback();
  }

  _final(callback) {
    if (this.data) {
      fs.write(this.fd, Buffer.from(this.data), (err) => {
        if (err) return callback(err);

        this.writesCount += 1;
        this.data = '';
        callback();
      });
    } else callback();
  }

  _destroy(error, callback) {
    if (this.fd) {
      fs.close(this.fd, (err) => {
        if (error || err) return callback(error || err);

        console.log('Number of writes:', this.writesCount);
        callback();
      });
    } else callback(error);
  }
}

module.exports = WriteStream;
