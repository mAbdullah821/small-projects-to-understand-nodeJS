const axios = require('axios');

const orderTotal_1 = async (axios, cart) => {
  const orders = cart.orders;

  let vat = null;
  if (cart.countryCode) {
    const jsonData = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/' + cart.countryCode
    );
    vat = jsonData.data.id;
  }

  const notShippingOrders = orders.filter((order) => !order.shipping);
  const ordersCost = notShippingOrders.reduce(
    (acc, cur) => acc + cur.price * (cur.quantity || 1),
    0
  );

  const shippingCost = orders.find((order) => order.shipping)?.shipping ?? 0;

  let totalCost = ordersCost + shippingCost;

  if (vat) totalCost = Math.round(totalCost * (1 + vat / 100));

  return totalCost;
};

const orderTotal_2 = async (cart) => {
  const orders = cart.orders;

  let vat = null;
  if (cart.countryCode) {
    const jsonData = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/' + cart.countryCode
    );
    vat = jsonData.data.id;
  }

  const notShippingOrders = orders.filter((order) => !order.shipping);
  const ordersCost = notShippingOrders.reduce(
    (acc, cur) => acc + cur.price * (cur.quantity || 1),
    0
  );

  const shippingCost = orders.find((order) => order.shipping)?.shipping ?? 0;

  let totalCost = ordersCost + shippingCost;

  if (vat) totalCost = Math.round(totalCost * (1 + vat / 100));

  return totalCost;
};
module.exports = { orderTotal_1, orderTotal_2 };
