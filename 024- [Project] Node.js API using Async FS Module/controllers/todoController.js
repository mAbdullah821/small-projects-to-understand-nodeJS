const {
  createNewTodo,
  getAllTodoList,
  getTodoById,
  deleteTodoById,
  editTodoById,
} = require('../model');

module.exports.loggedInMiddleware = (req, res, next) => {
  const { username } = req.cookies;
  if (!username)
    return next(
      new Error('Please, Login first', {
        cause: { status: 404 },
      })
    );

  next();
};

module.exports.postNewTodo = async (req, res, next) => {
  try {
    const { username } = req.cookies;
    const { title } = req.body;
    if (!title) throw new Error('Please, Provide the <title> attribute');
    // create the new todo
    await createNewTodo(username, { title });
    res.send({ message: 'todo created successfully' });
  } catch (err) {
    err.statusCode = 404;
    return next(err);
  }
};

module.exports.getAllTodo = async (req, res, next) => {
  try {
    const { username } = req.cookies;
    res.send(await getAllTodoList(username));
  } catch (err) {
    err.statusCode = 404;
    return next(err);
  }
};

const getAndValidateId = (req) => {
  const { id } = req.params;
  if (!id) throw new Error('Please, provide the <id> attribute');
  return +id; // +id -----> string -> int
};

module.exports.getTodoUsingId = async (req, res, next) => {
  try {
    const { username } = req.cookies;
    const id = getAndValidateId(req);
    res.send(await getTodoById(username, id));
  } catch (err) {
    err.statusCode = 404;
    return next(err);
  }
};

module.exports.deleteTodoUsingId = async (req, res, next) => {
  try {
    const { username } = req.cookies;
    const id = getAndValidateId(req);
    await deleteTodoById(username, id);
    res.send({ message: 'todo deleted successfully' });
  } catch (err) {
    err.statusCode = 404;
    return next(err);
  }
};

module.exports.editTodoUsingId = async (req, res, next) => {
  try {
    const statusList = ['to-do', 'in progress', 'done'];
    const { username } = req.cookies;
    const id = getAndValidateId(req);
    let { title, status } = req.body;

    if (!title && !status)
      throw new Error('Please, Provide any attribute from {title, status}');
    if (status) {
      status = status.toLowerCase();
      if (!statusList.includes(status))
        throw new Error(
          `Please, choose one status from ['to-do', 'in progress', 'done']`
        );
    }
    await editTodoById(username, id, { title, status });
    res.send({
      message: 'todo edited successfully',
      newTodo: await getTodoById(username, id),
    });
  } catch (err) {
    err.statusCode = 404;
    return next(err);
  }
};
