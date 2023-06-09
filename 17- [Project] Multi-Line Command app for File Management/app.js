const chokidar = require('chokidar');
const multiLineAppendExecutor = require('./commandExecutors/multi-line-append-executor');
const singleLineCommandsExecutor = require('./commandExecutors/single-line-commands-executor');

const {
  WATCHED_DIRECTORY,
  SINGLE_LINE_COMMANDS_FILE,
  MULTI_LINE_APPEND_COMMAND_FILE,
} = require('./utils/config');

(async () => {
  const watcher = chokidar.watch(WATCHED_DIRECTORY);
  console.log(`the directory: [${WATCHED_DIRECTORY}] is being watched...`);

  watcher.on('change', async (path) => {
    if (path.includes(SINGLE_LINE_COMMANDS_FILE)) {
      await singleLineCommandsExecutor.executeCommands();
    }

    if (path.includes(MULTI_LINE_APPEND_COMMAND_FILE)) {
      multiLineAppendExecutor.executeCommand();
    }
  });
})();
