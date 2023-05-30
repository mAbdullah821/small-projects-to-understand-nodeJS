const fs = require('fs');
const {
  ROOT_PATH,
  WATCHED_DIRECTORY,
  MULTI_LINE_APPEND_COMMAND_FILE,
  ADD_TO_FILE_COMMAND,
} = require('../utils/config');

const { addToFile } = require('../controllers/file-manipulation-controllers');

class MultiLineAppendExecutor {
  constructor() {
    this._fileHandler = null;
    this._isCommandInProgress = false;
  }

  async initializeFileHandler() {
    if (this._fileHandler) {
      console.error('The file is already initialized!');
      return;
    }

    // Used to bind `this` with a function call later on.
    const tempThis = this;

    try {
      this._fileHandler = await fs.promises.open(
        WATCHED_DIRECTORY + `/${MULTI_LINE_APPEND_COMMAND_FILE}`
      );

      this._fileHandler.on('change', async (command, cb) => {
        let validCommand = false;

        // add to the file <relative_path> content: <multi_line_content>
        if (command.startsWith(ADD_TO_FILE_COMMAND)) {
          validCommand = true;
          await this._handleAddToFileCommand(command);
        }

        if (!validCommand) {
          this._handleCommandIsNotValid(command);
        }

        cb.call(tempThis);
      });
    } catch (err) {
      console.error(`Error opening file, ${err}`);
    }
  }

  async executeCommands() {
    if (this._isCommandInProgress) {
      console.error('Wait for previous command to finish!');
      return;
    }

    this._isCommandInProgress = true;

    const offset = 0;
    const length = (await this._fileHandler.stat()).size;
    const position = 0;
    const buffer = Buffer.alloc(length);

    await this._fileHandler.read(buffer, offset, length, position);

    const command = buffer.toString('utf8');

    this._fileHandler.emit('change', command, () => {
      this._isCommandInProgress = false;
    });
  }

  async _handleAddToFileCommand(command) {
    const indexOf = ' content: ';
    const _idx = command.indexOf(indexOf);
    const path = command.substring(ADD_TO_FILE_COMMAND.length + 1, _idx);
    const content = command.substring(_idx + indexOf.length);

    await addToFile(ROOT_PATH + path, content);
  }

  _handleCommandIsNotValid(command) {
    console.log(`The command [${command}] is not a valid command`);
    console.log('Valid command is: ');
    console.log(`
      +-----------------------------------------------------------------+
      │ @> add to the file <relative_path> content: <multi_line_content>│
      +-----------------------------------------------------------------+
    `);
  }
}

module.exports = new MultiLineAppendExecutor();
