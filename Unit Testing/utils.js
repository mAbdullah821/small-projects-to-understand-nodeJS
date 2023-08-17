const getObject = (id) => {
  if (!id) throw new Error('id is not defined!');

  return { id, price: 50, isGood: true };
};

module.exports = { getObject };
