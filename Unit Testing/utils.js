const db = require('./db');
const email = require('./email');
const axios = require('axios');

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

const fetchOrder = async (id) => {
  const { data: order } = await axios.get(
    'https://jsonplaceholder.typicode.com/todos/' + id
  );

  console.log(order);

  return order;
};

const createOrder = async (userId, products = []) => {
  if (!userId) throw new Error('userId is not defined!');

  const price = products.reduce(
    (totalPrice, product) => totalPrice + product.price,
    0
  );

  await db.createOrder(userId, { products, totalPrice: price });

  const user = await db.getUser(userId);

  const message = `Order created successfully with totalPrice: ${price} and products: ${products}`;
  await email.send(user.email, message);

  return 'Done';
};

module.exports = {
  getObject,
  asyncGetObject,
  applyDiscount,
  fetchOrder,
  createOrder,
};
