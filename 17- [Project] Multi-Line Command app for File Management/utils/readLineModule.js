const fs = require('fs');
const readLine = require('readline');
const Emitter = require('events');
const { HIGH_WATER_MARK_FOR_READ_LINE } = require('./config');

class ReadLine {
  #readableStream = null;
  #readLineStreamer = null;
  #pushedLineEmitter = null;
  #lines = [];

  constructor(file, highWaterMark = HIGH_WATER_MARK_FOR_READ_LINE) {
    this.file = file;
    this.highWaterMark = highWaterMark;
    this.#pushedLineEmitter = new Emitter();
    this.#initializeStreamers();
  }

  hasNext() {
    return this.#lines.length || this.#readableStream.readable ? true : false;
  }

  async getNext() {
    if (this.hasNext()) return this.#getNewLine();
  }

  reset() {
    this.#initializeStreamers();
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
