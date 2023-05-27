const { program } = require('commander');
// -----> How to use
//  node index.js --help
// node index.js <command, ex. add> --help
// node index.js add -t 'a title'
// node index.js list

const {
  addToDB,
  validateStatus,
  listActivities,
  editActivity,
  deleteActivity,
} = require('./controllers');

program
  .command('add')
  .description('Add new activity')
  .requiredOption('-t, --title <title>', 'Indicates the title of activity')
  .action(addToDB);

program
  .command('list')
  .description('List all activities')
  .option(
    '-s, --status <status>',
    "choose one status from ['to-do', 'in progress', 'done']",
    validateStatus
  )
  .action(listActivities);

program
  .command('edit')
  .description('Edit an activity')
  .option('-t, --title <title>', 'Indicates the title of activity')
  .option(
    '-s, --status <status>',
    "choose one status from ['to-do', 'in progress', 'done']",
    validateStatus
  )
  .requiredOption('-i, --id <id>', 'Indicates the id of activity', parseInt)
  .action(editActivity);

program
  .command('delete')
  .description('delete an activity')
  .argument('<id>', 'Activity <id> to delete', parseInt)
  .action(deleteActivity);

program.parse();
