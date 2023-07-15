const fs = require('fs');
const readLine = require('readline');
const Emitter = require('events');
const { HIGH_WATER_MARK_FOR_READ_LINE } = require('./config');

class ReadLine {
  #readableStream = null;
  #readLineStreamer = null;
  #pushedLineEmitter = null;
  #lines = null;
  #isClosed = null;

  constructor(file, highWaterMark = HIGH_WATER_MARK_FOR_READ_LINE) {
    this.file = file;
    this.highWaterMark = highWaterMark;
    this.#pushedLineEmitter = new Emitter();
    this.reset();
  }

  hasNext() {
    return (this.#lines.length || this.#readableStream.readable) &&
      !this.#isClosed
      ? true
      : false;
  }

  async getNext() {
    if (this.hasNext()) return this.#getNewLine();
  }

  reset() {
    this.#initializeVariables();
    this.#initializeStreamers();
  }

  end() {
    // Prevents readLine 'line' event from adding new lines after .close().
    this.#isClosed = true;
    this.#lines = [];

    this.#readLineStreamer.close();
    this.#readableStream.destroy();
  }

  #initializeVariables() {
    this.#isClosed = false;
    this.#lines = [];
  }

  #initializeStreamers() {
    this.#readableStream = fs.createReadStream(this.file, {
      highWaterMark: this.highWaterMark,
    });

    this.#readLineStreamer = readLine.createInterface({
      input: this.#readableStream,
      crlfDelay: Infinity,
    });

    this.#readLineStreamer.on('line', (line) => {
      this.#readLineStreamer.pause();

      this.#lines.push(line);
      this.#pushedLineEmitter.emit('pushed');
    });
  }

  #getNewLine() {
    return new Promise((resolve) => {
      if (this.#lines.length) return resolve(this.#lines.shift());

      this.#readLineStreamer.resume();
      this.#pushedLineEmitter.once('pushed', () => {
        resolve(this.#lines.shift());
      });
    });
  }
}

module.exports = ReadLine;
