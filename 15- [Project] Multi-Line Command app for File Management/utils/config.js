const CREATE_FILE_COMMAND = 'create a file';
const DELETE_FILE_COMMAND = 'delete the file';
const RENAME_FILE_COMMAND = 'rename the file';
const ADD_TO_FILE_COMMAND = 'add to the file';

const ROOT_PATH = __dirname + '/..';
const WATCHED_DIRECTORY = ROOT_PATH + '/toWatch';
const SINGLE_LINE_COMMANDS_FILE = 'single-Line commands.txt';
const MULTI_LINE_APPEND_COMMAND_FILE = 'multi-line append command.txt';

module.exports = {
  CREATE_FILE_COMMAND,
  DELETE_FILE_COMMAND,
  RENAME_FILE_COMMAND,
  ADD_TO_FILE_COMMAND,
  WATCHED_DIRECTORY,
  SINGLE_LINE_COMMANDS_FILE,
  MULTI_LINE_APPEND_COMMAND_FILE,
  ROOT_PATH,
};
