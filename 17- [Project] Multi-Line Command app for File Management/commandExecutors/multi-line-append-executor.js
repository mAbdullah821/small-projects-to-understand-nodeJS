const fs = require('fs');
const {
  ROOT_PATH,
  WATCHED_DIRECTORY,
  MULTI_LINE_APPEND_COMMAND_FILE,
  ADD_TO_FILE_COMMAND,
  HIGH_WATER_MARK_FOR_READ_MULTILINE,
  END_LINE_PATTERN,
  MAX_COMMAND_LENGTH,
} = require('../utils/config');
const limitStringLength = require('../utils/limitStringLength');

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

  executeCommand() {
    if (this.#isCommandInProgress) {
      console.error('Wait for previous command to finish!');
      return;
    }

    console.log(`\n
        +-\x1b[36m--------------------------------------\x1b[0m-+
        |           Starting Execution           |
        +-\x1b[36m--------------------------------------\x1b[0m-+
    `);

    this.#initializeReadableStream();
    this.#isCommandInProgress = true;
    let checkOnce = false;
    this.#tmpChunk = '';

    this.#readableStream.on('data', (chunk) => {
      if (!checkOnce) {
        chunk = this.#tmpChunk + chunk.toString();

        if (chunk.indexOf(' content: ' + END_LINE_PATTERN) === -1) {
          this.#tmpChunk = chunk;

          if (this.#tmpChunk.length > MAX_COMMAND_LENGTH) {
            this.#readableStream.emit('end');
          }

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

  #initializeReadableStream() {
    this.#readableStream = fs.createReadStream(this.#readFile, {
      highWaterMark: HIGH_WATER_MARK_FOR_READ_MULTILINE,
    });

    this.#readableStream.on('end', () => {
      this.#endCommandExecution();
      const hasError = this.#handleCommandError();

      if (!hasError) {
        console.log(
          `Content added \x1b[32msuccessfully!\x1b[0m to the file ${
            this.#writeFile
          }`
        );
      }
    });
  }

  #endCommandExecution() {
    this.#readableStream.destroy();
    this.#writeableStream?.end();
    this.#isCommandInProgress = false;
  }

  #handleCommandError() {
    if (this.#tmpChunk) {
      if (this.#tmpChunk.length > MAX_COMMAND_LENGTH) {
        console.error(
          `\x1b[31m------ +++ <> +++ ------\x1b[0m\n> Your command length is very big: \x1b[31m>=${
            this.#tmpChunk.length
          }\x1b[0m.\n> Max allowed command length is: \x1b[32m${MAX_COMMAND_LENGTH} \x1b[0m.\n`
        );
      }
      this.#handleCommandIsNotValid(this.#tmpChunk);

      return true;
    }

    return false;
  }

  #initializeWritableStream(path) {
    this.#writeableStream = fs.createWriteStream(path, {
      flags: 'a',
    });

    this.#writeableStream.on('drain', () => {
      this.#readableStream.resume();
    });
  }

  #processTheChunk(chunk) {
    const [commandLength, path] = this.#getCommandInfo(chunk);

    if (
      !chunk.startsWith(ADD_TO_FILE_COMMAND) ||
      !commandLength ||
      commandLength > MAX_COMMAND_LENGTH
    ) {
      this.#tmpChunk = chunk.slice(0, commandLength ?? chunk.length);
      this.#readableStream.emit('end');
      return null;
    }

    chunk = chunk.slice(commandLength);
    this.#writeFile = ROOT_PATH + path;
    this.#initializeWritableStream(this.#writeFile);
    return chunk;
  }

  // add to the file <relative_path> content: <multi_line_content>
  #getCommandInfo(command) {
    const endLineLength = END_LINE_PATTERN.length;
    const indexOfContent = ' content: ';
    const idx = command.indexOf(indexOfContent);
    if (idx === -1) return [];

    const path = command.substring(ADD_TO_FILE_COMMAND.length + 1, idx);
    const commandLength = idx + indexOfContent.length + endLineLength;

    return [commandLength, path];
  }

  #handleCommandIsNotValid(command) {
    console.log(
      `The command [${limitStringLength(
        command
      )}] \x1b[31mis not a valid command!\x1b[0m`
    );
    console.log('\x1b[32m%s\x1b[0m', 'Valid command is: ');

    console.log(`
      +----------------------------------------------------------------------+
      │ @> add to the file <relative_path> content: <Must [space + NewLine]> |
      |  <multi_line_content>                                                │
      +----------------------------------------------------------------------+
    `);
  }
}

module.exports = new MultiLineAppendExecutor();
