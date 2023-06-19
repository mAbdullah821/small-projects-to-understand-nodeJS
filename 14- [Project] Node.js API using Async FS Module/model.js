const { read } = require('fs');

const fs = require('fs').promises;

// Data structure
// People:[
//   {
//     id: int
//     username: string (lowercase)
//     password: string
//     loggedIn: bool
//     todoList: [
//       {
//         id: int
//         title: string
//         status: string
//       }
//     ]
//   }
// ]

const dbPath = './data.json';

const readData = async () => {
  try {
    const data = (await fs.readFile(dbPath, 'utf8')) || '[]';
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    // throw new Error("Can't read the file");
  }
};

const writeData = async (data) => {
  try {
    fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.log(err);
  }
};

const getNewId = (list) => {
  let id = 0;
  list.forEach((data) => (id = Math.max(data.id, id)));
  return id + 1;
};

module.exports.createNewTodo = async (username, { title }) => {
  const data = await readData();
  // get the userObject
  const user = data.find((person) => person.username === username);
  // get a new id
  const newId = getNewId(user.todoList);
  // add the new todo
  user.todoList.push({ id: newId, title, status: 'to-do' });
  // save changes into the database
  writeData(data);
};

module.exports.getAllTodoList = async (username) => {
  const data = await readData();
  // get the target user
  const user = data.find((person) => person.username === username);
  return user.todoList;
};

module.exports.getTodoById = async (username, id) => {
  // get all todoList
  const todoList = await this.getAllTodoList(username);
  // search for the target todo
  const todo = todoList.find((todo) => todo.id === id);
  if (!todo) throw new Error(`Can't find a todo with that id: ${id}`);
  return todo;
};

module.exports.deleteTodoById = async (username, id) => {
  const data = await readData();
  // find the user object
  const user = data.find((user) => user.username === username);
  // find the todo index
  const todoIdx = user.todoList.findIndex((todo) => todo.id === id);
  // handle error [not found]
  if (todoIdx === -1) throw new Error(`Can't find a todo with that id: ${id}`);
  // remove the todo
  user.todoList.splice(todoIdx, 1);
  // save changes into the database
  writeData(data);
};

module.exports.editTodoById = async (username, id, { title, status }) => {
  const data = await readData();
  // get the user object
  const user = data.find((user) => user.username === username);
  // get the todo object
  const todo = user.todoList.find((todo) => todo.id === id);
  if (!todo) throw new Error(`Can't find a todo with that id: ${id}`);
  // edit the object
  if (title) todo.title = title;
  if (status) todo.status = status;
  // save the changes into the database
  writeData(data);
};

// User model

module.exports.createNewUser = async ({ username, password, firstName }) => {
  const data = await readData();
  // get id for the new user
  const newId = getNewId(data);
  // create a new user object
  const newUser = {
    id: newId,
    username,
    password,
    firstName,
    loggedIn: false,
    todoList: [],
  };
  // add the new user
  data.push(newUser);
  // save changes into the database
  writeData(data);
};

module.exports.isUsernameExist = async (username) => {
  const data = await readData();
  // get the user object
  const user = data.find((user) => user.username === username);
  return user ? user : false;
};

module.exports.setLoggedIn = async (username, value) => {
  const data = await readData();
  // get the user object
  const user = data.find((user) => user.username === username);
  // set [loggedIn = true]
  user.loggedIn = value;
  // save the changes into the database
  writeData(data);
};
