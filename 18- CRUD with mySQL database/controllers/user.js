const tryCatch = require('../utils/tryCatch');

module.exports = (sqlConn) => {
  const addUser = (req, res) => {
    tryCatch(res, async () => {
      let { name, age, courseId } = req.body;

      name = name || null;
      age = age || null;
      courseId = courseId || null;

      const [result] = await sqlConn.execute(
        `
        INSERT INTO users (name, age, course_id) 
        VALUES (?, ?, ?)
        `,
        [name, age, courseId]
      );
      res.send({
        msg: 'user added successfully!',
        user: { id: result.insertId, name, age, courseId },
      });
    });
  };

  const getAllUsers = (req, res) => {
    tryCatch(res, async () => {
      const [result, fields] = await sqlConn.execute(`
        SELECT U.id, U.name, U.age, C.id as courseId, C.name as courseName 
        FROM users U LEFT JOIN courses C 
        ON U.course_id = C.id
      `);

      res.send({ msg: 'operation done successfully!', users: result });
    });
  };

  const editUser = (req, res) => {
    tryCatch(res, async () => {
      const id = req.params.id;
      const keys = ['name', 'age', 'courseId'];
      const fieldsToSet = [];
      const valuesToSetWith = [];

      Object.entries(req.body).forEach(([key, value]) => {
        if (!keys.includes(key) || !value) return;
        if (key === 'courseId') key = 'course_id';

        fieldsToSet.push(`${key} = ?`);
        valuesToSetWith.push(value);
      });

      valuesToSetWith.push(id);
      const [editResult] = await sqlConn.execute(
        `
        UPDATE users
        SET ${fieldsToSet.join(', ')}
        WHERE id = ?
      `,
        valuesToSetWith
      );

      if (!editResult.affectedRows) throw new Error('this id is not exist');

      const [searchResult] = await sqlConn.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );

      res.send({ msq: 'data edited successfully!', user: searchResult });
    });
  };

  const deleteUser = (req, res) => {
    tryCatch(res, async () => {
      const id = req.params.id;
      const [result] = await sqlConn.execute('DELETE FROM users WHERE id = ?', [
        id,
      ]);

      if (!result.affectedRows) throw new Error('this id is not exist');

      res.send({ msg: 'user deleted successfully!' });
    });
  };

  return {
    addUser,
    getAllUsers,
    editUser,
    deleteUser,
  };
};
