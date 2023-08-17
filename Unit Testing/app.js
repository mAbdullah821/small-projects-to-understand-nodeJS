const axios = require('axios');
const { orderTotal_1, orderTotal_2 } = require('./order-total.js');

const cart = {
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

orderTotal(axios, cart).then((cost) => console.log('Orders-Cost: ', cost));
orderTotal(axios, cart2).then((cost) => console.log('Orders-Cost: ', cost));
