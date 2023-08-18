const getOrder = (id) => {
  return { id, price: 50 };
};

const updateOrder = (order) => {
  console.log(order);
};

const createOrder = async (userId, order) => {
  console.log(userId, ' --> ', order);

  return 'Done';
};

const getUser = async (id) => {
  return {
    id,
    email: `hello, ${id}`,
  };
};

module.exports = { getOrder, updateOrder, createOrder, getUser };
