const express = require('express');
const router = express.Router();
const {
  loggedInMiddleware,
  getAllTodo,
  getTodoUsingId,
  postNewTodo,
  deleteTodoUsingId,
  editTodoUsingId,
} = require('../controllers/todoController');

// middleware
router.use(loggedInMiddleware);
// routes
router.get('/', getAllTodo);
router.get('/:id(\\d{0,})', getTodoUsingId);
router.post('/', postNewTodo);
router.delete('/:id(\\d{0,})', deleteTodoUsingId);
router.patch('/:id(\\d{0,})', editTodoUsingId);

module.exports = router;
