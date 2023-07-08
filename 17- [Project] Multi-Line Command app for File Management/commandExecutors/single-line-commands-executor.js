const ReadLine = require('../utils/readLineModule');
const {
  ROOT_PATH,
  WATCHED_DIRECTORY,
  SINGLE_LINE_COMMANDS_FILE,
  CREATE_FILE_COMMAND,
  DELETE_FILE_COMMAND,
  RENAME_FILE_COMMAND,
  ADD_TO_FILE_COMMAND,
  MAX_COMMAND_LENGTH,
} = require('../utils/config');

const {
  createFile,
  deleteFile,
  renameFile,
  addToFile,
} = require('../controllers/file-manipulation-controllers');
const limitStringLength = require('../utils/limitStringLength');

class SingleLineCommandsExecutor {
  #file = null;
  #readLine = null;
  #areCommandsInProgress = false;

  constructor() {
    this.#file = WATCHED_DIRECTORY + `/${SINGLE_LINE_COMMANDS_FILE}`;
    this.#readLine = new ReadLine(this.#file);
  }

  async executeCommands() {
    if (this.#areCommandsInProgress) {
      console.error('Wait for previous commands to finish!');
      return;
    }

    this.#areCommandsInProgress = true;

    while (this.#readLine.hasNext()) {
      const command = await this.#readLine.getNext();

      if (command.length > MAX_COMMAND_LENGTH) {
        this.#endCommandsExecutionAndHandleInvalid(command);
        break;
      }

      await this.#executeOneCommand(command);
    }

    this.#areCommandsInProgress = false;
    this.#readLine.reset();
  }

  #endCommandsExecutionAndHandleInvalid(command) {
    this.#readLine.end();

    if (command.length > MAX_COMMAND_LENGTH) {
      console.log(
        `\x1b[31m------ +++ <> +++ ------\x1b[0m\n> Your command length is very big: \x1b[31m=${command.length}\x1b[0m.\n> Max allowed command length is: \x1b[32m${MAX_COMMAND_LENGTH} \x1b[0m.\n`
      );
    }

    this.#handleCommandIsNotValid(command);
  }

  async #executeOneCommand(command) {
    let validCommand = false;

    if (command.startsWith(CREATE_FILE_COMMAND)) {
      validCommand = true;
      await this.#handleCreateFileCommand(command);
    }

    if (command.startsWith(DELETE_FILE_COMMAND)) {
      validCommand = true;
      await this.#handleDeleteFileCommand(command);
    }

    if (command.startsWith(RENAME_FILE_COMMAND)) {
      validCommand = true;
      await this.#handleRenameFileCommand(command);
    }

    if (command.startsWith(ADD_TO_FILE_COMMAND)) {
      validCommand = true;
      await this.#handleAddToFileCommand(command);
    }

    if (!validCommand) {
      this.#endCommandsExecutionAndHandleInvalid(command);
    }
  }

  // create a file <relative_path>
  async #handleCreateFileCommand(command) {
    const path = command.substring(CREATE_FILE_COMMAND.length + 1);

    await createFile(ROOT_PATH + path);
  }

  // delete the file <relative_path>
  async #handleDeleteFileCommand(command) {
    const path = command.substring(DELETE_FILE_COMMAND.length + 1);

    await deleteFile(ROOT_PATH + path);
  }

  // rename the file <relative_oldPath> to <relative_newPath>
  async #handleRenameFileCommand(command) {
    const indexOfTo = ' to ';
    const idx = command.indexOf(indexOfTo);
    const oldPath = command.substring(RENAME_FILE_COMMAND.length + 1, idx);
    const newPath = command.substring(idx + indexOfTo.length);

    await renameFile(ROOT_PATH + oldPath, ROOT_PATH + newPath);
  }

  // add to the file <relative_path> content: <one_line_content>
  async #handleAddToFileCommand(command) {
    const indexOfContent = ' content: ';
    const idx = command.indexOf(indexOfContent);
    const path = command.substring(ADD_TO_FILE_COMMAND.length + 1, idx);
    const content = command.substring(idx + indexOfContent.length);

    await addToFile(ROOT_PATH + path, content);
  }

  #handleCommandIsNotValid(command) {
    console.log(
      `The command [${limitStringLength(
        command
      )}] \x1b[31mis not a valid command!\x1b[0m`
    );
    console.log('\x1b[32m%s\x1b[0m', 'Valid commands are: ');
    console.log(
      `
      +---------------------------------------------------------------+
      │ @> create a file <relative_path>                              │
      │ @> delete the file <relative_path>                            │
      │ @> rename the file <relative_oldPath> to <relative_newPath>   │
      │ @> add to the file <relative_path> content: <one_line_content>│
      +---------------------------------------------------------------+
    `
    );
  }
}

module.exports = new SingleLineCommandsExecutor();
