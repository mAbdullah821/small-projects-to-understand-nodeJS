const getOrder = (id) => {
  return { id, price: 50 };
};

const updateOrder = (order) => {
  console.log(order);
};

module.exports = { getOrder, updateOrder };
