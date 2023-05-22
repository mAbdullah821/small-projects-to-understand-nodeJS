const express = require('express');
const mysql = require('mysql2/promise');
const userController = require('./controllers/user');
const courseController = require('./controllers/course');

const app = express();
const PORT = 5050;

app.use(express.json());

(async () => {
  const sqlConn = await mysql.createConnection({
    user: 'hello',
    password: 'world',
    database: 'understand_nodejs_database',
    port: '3303',
  });

  const user = userController(sqlConn);
  const course = courseController(sqlConn);

  // users
  app.post('/users', user.addUser);
  app.get('/users', user.getAllUsers);
  app.patch('/users/:id', user.editUser);
  app.delete('/users/:id', user.deleteUser);

  // courses
  app.post('/courses', course.addCourse);
  app.get('/courses', course.getAllCourses);
  app.patch('/courses/:id', course.editCourse);
  app.delete('/courses/:id', course.deleteCourse);

  app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });
})();
