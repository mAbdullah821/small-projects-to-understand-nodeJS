const tryCatch = require('../tryCatch');

module.exports = (sqlConn) => {
  const getAllCourses = (req, res) => {
    tryCatch(res, async () => {
      const [result, fields] = await sqlConn.execute('SELECT * FROM courses');
      res.send({ msg: 'course added successfully!', courses: result });
    });
  };

  const addCourse = (req, res) => {
    tryCatch(res, async () => {
      let { name } = req.body;
      name = name || null;

      const [result] = await sqlConn.execute(
        'INSERT INTO courses (name) VALUES (?)',
        [name]
      );

      res.send({
        msg: 'course added successfully!',
        course: { id: result.insertId, name },
      });
    });
  };

  const editCourse = (req, res) => {
    tryCatch(res, async () => {
      const id = req.params.id;
      const { name } = req.body;

      if (!name) return res.send({ msg: 'failed: provide some values' });

      const [editResult] = await sqlConn.execute(
        `
        UPDATE courses
        SET name = ?
        WHERE id = ?
        `,
        [name, id]
      );

      if (!editResult.affectedRows) throw new Error('this id is not exist');

      const [searchResult] = await sqlConn.execute(
        'SELECT * FROM courses WHERE id = ?',
        [id]
      );
      res.send({ msq: 'data edited successfully!', course: searchResult });
    });
  };

  const deleteCourse = async (req, res) => {
    tryCatch(res, async () => {
      const id = req.params.id;

      const [result] = await sqlConn.execute(
        'DELETE FROM courses WHERE id = ?',
        [id]
      );

      if (!result.affectedRows) throw new Error('this id is not exist');

      res.send({ msg: 'course deleted successfully!' });
    });
  };

  return {
    addCourse,
    getAllCourses,
    editCourse,
    deleteCourse,
  };
};
