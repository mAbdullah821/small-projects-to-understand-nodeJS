const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./Routers/userRouter');
const todoRouter = require('./Routers/todoRouter');

const PORT = 3000;
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use(userRouter);
app.use('/todo', todoRouter);
app.use((req, res) => {
  res.status(404).send(`can't find a route for: ${req.method} ${req.url}`);
});

// handle the errors
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || err.cause?.status || 500;
  err.message = err.statusCode < 500 ? err.message : 'Internal server error';
  res.status(err.statusCode).send({
    error: err.message,
  });
});

app.listen(PORT, (err) => {
  if (err) console.log('Error in server setup');
  console.log('Server listening on Port', PORT);
});
