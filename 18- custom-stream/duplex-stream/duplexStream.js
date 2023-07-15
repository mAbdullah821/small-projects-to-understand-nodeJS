const { Duplex } = require('stream');
const fs = require('fs');

class DuplexStream extends Duplex {
  constructor({
    readableHighWaterMark,
    writableHighWaterMark,
    readFile,
    writeFile,
  }) {
    super({ readableHighWaterMark, writableHighWaterMark });

    this.readFile = readFile;
    this.writeFile = writeFile;

    this.readFd = null;
    this.writeFd = null;

    this.writeChunks = [];
    this.writeChunksSize = 0;
  }

  _construct(callback) {
    fs.open(this.readFile, (readError, readFd) => {
      if (readError) return callback(readError);

      fs.open(this.writeFile, 'w', (writeError, writeFd) => {
        if (writeError) return callback(writeError);

        this.readFd = readFd;
        this.writeFd = writeFd;

        callback();
      });
    });
  }

  _write(chunk, encoding, callback) {
    this.writeChunks.push(chunk);
    this.writeChunksSize += chunk.length;

    if (this.writeChunksSize >= this.writableHighWaterMark) {
      fs.write(this.writeFd, Buffer.concat(this.writeChunks), (err) => {
        if (err) return callback(err);

        this.writeChunks = [];
        this.writeChunksSize = 0;
        callback();
      });
    } else callback();
  }

  _read(size) {
    const buff = Buffer.alloc(size);

    fs.read(this.readFd, buff, 0, size, null, (err, bytesRead) => {
      if (err) return this.destroy(err);

      this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
    });
  }

  _final(callback) {
    if (this.writeChunksSize) {
      fs.write(this.writeFd, Buffer.concat(this.writeChunks), (err) => {
        if (err) return callback(err);

        this.writeChunks = [];
        this.writeChunksSize = 0;
        callback();
      });
    } else callback();
  }

  _destroy(error, callback) {
    if (this.readFd && this.writeFd) {
      fs.close(this.readFd, (readError) => {
        fs.close(this.writeFd, (writeError) => {
          callback(readError || writeError || error);
        });
      });
    } else callback(error);
  }
}

module.exports = DuplexStream;
