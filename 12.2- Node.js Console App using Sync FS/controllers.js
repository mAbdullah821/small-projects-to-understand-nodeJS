const fs = require('fs');
const { InvalidArgumentError } = require('commander');

const dbPath = './todoList.json';

const readDB = (filterFunction = null) => {
  let data = fs.readFileSync(dbPath, { encoding: 'utf8' }) || '[]';
  data = JSON.parse(data);
  if (filterFunction) {
    data = data.filter(filterFunction);
  }
  return data;
};

const writeToDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const getNewId = (data) => {
  let newId = 0;
  data.forEach(({ id }) => (newId = Math.max(newId, id)));
  return newId + 1;
};

module.exports.addToDB = ({ title }) => {
  const data = readDB();
  data.push({ id: getNewId(data), title, status: 'to-do' });
  writeToDB(data);
  console.log('Added successfully');
};

// readDB();
// console.log(getNewId([]));
// console.log(1321354684654648);
module.exports.editActivity = ({ id, title, status }) => {
  if (!title && !status) {
    console.log(
      'please provide a field to edit, use [edit --help] for more info'
    );
    return;
  }
  const data = readDB();

  const idx = data.findIndex((activity) => activity.id === id);

  if (idx !== -1) {
    if (title) data[idx].title = title;
    if (status) data[idx].status = status;

    writeToDB(data);
    console.log('Edit successfully');
  } else {
    console.log('There is no activity with that [id]');
  }
};

module.exports.deleteActivity = (id) => {
  const data = readDB();
  const newData = data.filter((activity) => activity.id !== id);

  if (data.length === newData.length) {
    console.log('There is no activity with that <id>');
  } else {
    writeToDB(newData);
    console.log('Delete Successfully');
  }
};

module.exports.validateStatus = (status) => {
  const statusList = ['to-do', 'in progress', 'done'];
  status = status.toLowerCase();
  if (statusList.includes(status)) return status;
  throw new InvalidArgumentError(
    `Please choose one status from: ['to-do', 'in progress', 'done']`
  );
};

module.exports.listActivities = ({ status }) => {
  if (status) {
    const filterFunction = (activity) => activity.status === status;
    console.log(readDB(filterFunction));
  } else console.log(readDB());
};
