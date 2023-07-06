const fs = require('fs');
const {
  ROOT_PATH,
  WATCHED_DIRECTORY,
  MULTI_LINE_APPEND_COMMAND_FILE,
  ADD_TO_FILE_COMMAND,
  HIGH_WATER_MARK_FOR_READ_MULTILINE,
  END_LINE_PATTERN,
} = require('../utils/config');

class MultiLineAppendExecutor {
  #readFile = null;
  #writeFile = null;
  #readableStream = null;
  #writeableStream = null;
  #isCommandInProgress = false;
  // A temporary container is used to reconstruct the full command from its chunks, which may be larger than the highWaterMark.
  #tmpChunk = null;

  constructor() {
    this.#readFile = WATCHED_DIRECTORY + `/${MULTI_LINE_APPEND_COMMAND_FILE}`;
  }

  #initializeReadableStream() {
    this.#readableStream = fs.createReadStream(this.#readFile, {
      highWaterMark: HIGH_WATER_MARK_FOR_READ_MULTILINE,
    });

    this.#readableStream.on('end', () => {
      this.#isCommandInProgress = false;
      this.#writeableStream?.end();

      if (this.#tmpChunk) {
        this.#handleCommandIsNotValid(this.#tmpChunk);
        return;
      }

      console.log(`Content added successfully! to the file ${this.#writeFile}`);
    });
  }

  #initializeWritableStream(path) {
    this.#writeableStream = fs.createWriteStream(path, {
      flags: 'a',
    });

    this.#writeableStream.on('drain', () => {
      this.#readableStream.resume();
    });
  }

  executeCommand() {
    if (this.#isCommandInProgress) {
      console.error('Wait for previous command to finish!');
      return;
    }

    this.#initializeReadableStream();
    this.#isCommandInProgress = true;
    let checkOnce = false;
    this.#tmpChunk = '';

    this.#readableStream.on('data', (chunk) => {
      if (!checkOnce) {
        chunk = this.#tmpChunk + chunk.toString();
        if (chunk.indexOf(' content: ' + END_LINE_PATTERN) === -1) {
          this.#tmpChunk = chunk;
          return;
        }

        chunk = this.#processTheChunk(chunk);
        if (chunk === null) return;

        checkOnce = true;
        this.#tmpChunk = '';
      }

      const moreWrites = this.#writeableStream.write(chunk);
      if (!moreWrites) this.#readableStream.pause();
    });
  }

  #processTheChunk(chunk) {
    let validCommand = false;

    if (chunk.startsWith(ADD_TO_FILE_COMMAND)) {
      validCommand = true;
      const [commandLength, path] = this.#getCommandInfo(chunk);
      chunk = chunk.slice(commandLength);

      this.#writeFile = ROOT_PATH + path;
      this.#initializeWritableStream(this.#writeFile);
    }

    if (!validCommand) {
      this.#readableStream.destroy();
      this.#isCommandInProgress = false;
      this.#handleCommandIsNotValid(chunk);

      chunk = null;
    }

    return chunk;
  }

  // add to the file <relative_path> content: <multi_line_content>
  #getCommandInfo(command) {
    const endLineLength = END_LINE_PATTERN.length;
    const indexOfContent = ' content: ';
    const idx = command.indexOf(indexOfContent);
    const path = command.substring(ADD_TO_FILE_COMMAND.length + 1, idx);
    const commandLength = idx + indexOfContent.length + endLineLength;

    return [commandLength, path];
  }

  #handleCommandIsNotValid(command) {
    console.log(`The command [${command}] is not a valid command`);
    console.log('Valid command is: ');
    console.log(`
      +----------------------------------------------------------------------+
      │ @> add to the file <relative_path> content: <Must [space + NewLine]> |
      |  <multi_line_content>                                                │
      +----------------------------------------------------------------------+
    `);
  }
}

module.exports = new MultiLineAppendExecutor();
