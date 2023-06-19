const fs = require('fs');
const readLine = require('readline');
const {
  ROOT_PATH,
  WATCHED_DIRECTORY,
  SINGLE_LINE_COMMANDS_FILE,
  CREATE_FILE_COMMAND,
  DELETE_FILE_COMMAND,
  RENAME_FILE_COMMAND,
  ADD_TO_FILE_COMMAND,
} = require('../utils/config');

const {
  createFile,
  deleteFile,
  renameFile,
  addToFile,
} = require('../controllers/file-manipulation-controllers');

class SingleLineCommandsExecutor {
  constructor() {
    this._commands = [];
    this._fileHandler = null;
    this._startExecuteCommands = true;
    this._areCommandsInProgress = false;
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
        WATCHED_DIRECTORY + `/${SINGLE_LINE_COMMANDS_FILE}`
      );

      this._fileHandler.on('change', async (command, cb = null) => {
        let validCommand = false;

        // create a file <relative_path>
        if (command.startsWith(CREATE_FILE_COMMAND)) {
          validCommand = true;
          await this._handleCreateFileCommand(command);
        }

        // delete the file <relative_path>
        if (command.startsWith(DELETE_FILE_COMMAND)) {
          validCommand = true;
          await this._handleDeleteFileCommand(command);
        }

        // rename the file <relative_oldPath> to <relative_newPath>
        if (command.startsWith(RENAME_FILE_COMMAND)) {
          validCommand = true;
          await this._handleRenameFileCommand(command);
        }

        // add to the file <relative_path> content: <one_line_content>
        if (command.startsWith(ADD_TO_FILE_COMMAND)) {
          validCommand = true;
          await this._handleAddToFileCommand(command);
        }

        if (!validCommand) {
          this._handleCommandIsNotValid(command);
        }

        if (typeof cb === 'function') cb.call(tempThis);
      });
    } catch (err) {
      console.error(`Error opening file, ${err}`);
    }
  }

  async executeCommands() {
    if (this._areCommandsInProgress) {
      console.error('Wait for previous commands to finish!');
      return;
    }

    this._areCommandsInProgress = true;

    const readableStream = fs.createReadStream(
      WATCHED_DIRECTORY + `/${SINGLE_LINE_COMMANDS_FILE}`
    );

    const commandsFile = readLine.createInterface({
      input: readableStream,
      crlfDelay: Infinity,
    });

    commandsFile.on('line', (line) => {
      this._commands.push(line);

      if (this._startExecuteCommands) {
        this._startExecuteCommands = false;
        this._recursiveExecuteCommands();
      }
    });
  }

  _recursiveExecuteCommands() {
    if (!this._commands.length) {
      this._startExecuteCommands = true;
      this._areCommandsInProgress = false;
      return;
    }

    this._fileHandler.emit(
      'change',
      this._commands.shift(),
      this._recursiveExecuteCommands
    );
  }

  async _handleCreateFileCommand(command) {
    const path = command.substring(CREATE_FILE_COMMAND.length + 1);

    await createFile(ROOT_PATH + path);
  }

  async _handleDeleteFileCommand(command) {
    const path = command.substring(DELETE_FILE_COMMAND.length + 1);

    await deleteFile(ROOT_PATH + path);
  }

  async _handleRenameFileCommand(command) {
    const indexOf = ' to ';
    const _idx = command.indexOf(indexOf);
    const oldPath = command.substring(RENAME_FILE_COMMAND.length + 1, _idx);
    const newPath = command.substring(_idx + indexOf.length);

    await renameFile(ROOT_PATH + oldPath, ROOT_PATH + newPath);
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
    console.log('Valid commands are: ');
    console.log(`
      +---------------------------------------------------------------+
      │ @> create a file <relative_path>                              │
      │ @> delete the file <relative_path>                            │
      │ @> rename the file <relative_oldPath> to <relative_newPath>   │
      │ @> add to the file <relative_path> content: <one_line_content>│
      +---------------------------------------------------------------+
    `);
  }
}

module.exports = new SingleLineCommandsExecutor();
