module.exports = async (res, cb) => {
  try {
    await cb();
  } catch (err) {
    console.log(err);
    res.send({ msg: 'there is an error' });
  }
};
