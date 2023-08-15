const CREATE_FILE_COMMAND = 'create a file';
const DELETE_FILE_COMMAND = 'delete the file';
const RENAME_FILE_COMMAND = 'rename the file';
const ADD_TO_FILE_COMMAND = 'add to the file';

const ROOT_PATH = '.';
const WATCHED_DIRECTORY = ROOT_PATH + '/toWatch';
const SINGLE_LINE_COMMANDS_FILE = 'single-Line commands.txt';
const MULTI_LINE_APPEND_COMMAND_FILE = 'multi-line append command.txt';

const END_LINE_PATTERN = '\r\n';
const HIGH_WATER_MARK_FOR_READ_LINE = 16 * 1024; // 16 KB
const HIGH_WATER_MARK_FOR_READ_MULTILINE = 16 * 1024; // 16 KB
const MAX_COMMAND_LENGTH = 4 * 1024; // 4 KB
const MAX_COMMAND_DISPLAY_LENGTH = 24;

module.exports = {
  CREATE_FILE_COMMAND,
  DELETE_FILE_COMMAND,
  RENAME_FILE_COMMAND,
  ADD_TO_FILE_COMMAND,
  WATCHED_DIRECTORY,
  SINGLE_LINE_COMMANDS_FILE,
  MULTI_LINE_APPEND_COMMAND_FILE,
  ROOT_PATH,
  HIGH_WATER_MARK_FOR_READ_LINE,
  HIGH_WATER_MARK_FOR_READ_MULTILINE,
  END_LINE_PATTERN,
  MAX_COMMAND_LENGTH,
  MAX_COMMAND_DISPLAY_LENGTH,
};