const axios = require('axios');
const utils = require('./utils');
const { orderTotal_1, orderTotal_2 } = require('./order-total.js');

const cart1 = {
  orders: [
    { price: 30, quantity: 3 },
    { price: 15, quantity: 2 },
    { price: 5, quantity: 2 },
    { shipping: 30 },
  ],
};

const cart2 = {
  countryCode: 20,
  orders: [
    { price: 30, quantity: 3 },
    { price: 15, quantity: 2 },
    { price: 5, quantity: 2 },
    { shipping: 30 },
  ],
};

orderTotal_1(axios, cart1).then((cost) =>
  console.log('orderTotal_1 - cart1 - Orders-Cost: ', cost)
);
orderTotal_1(axios, cart2).then((cost) =>
  console.log('orderTotal_1 - cart2 - Orders-Cost: ', cost)
);

orderTotal_2(cart1).then((cost) =>
  console.log('orderTotal_2 - cart1 - Orders-Cost: ', cost)
);
orderTotal_2(cart2).then((cost) =>
  console.log('orderTotal_2 - cart2 - Orders-Cost: ', cost)
);
