const db = require('./db');

const getObject = (id) => {
  if (!id) throw new Error('id is not defined!');

  return { id, price: 50, isGood: true };
};

const asyncGetObject = async (id) => {
  if (!id) throw new Error('id is not defined!');

  return [{ id, price: 50, isGood: true }];
};

const applyDiscount = (orderId) => {
  const order = db.getOrder(orderId);

  if (order.price >= 10) {
    order.price -= order.price * 0.1;

    db.updateOrder(order);
  }

  return order;
};

module.exports = { getObject, asyncGetObject, applyDiscount };
