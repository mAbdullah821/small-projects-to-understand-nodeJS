const axios = require('axios');
const { orderTotal_1, orderTotal_2 } = require('./order-total.js');

jest.mock('axios');

test('orderTotal_1 - Correct orders cost', () =>
  orderTotal_1(null, {
    orders: [{ price: 30 }, { price: 15 }, { price: 5 }],
  }).then((value) => expect(value).toBe(50)));

test('orderTotal_1 - add quantity to the order', () =>
  orderTotal_1(null, {
    orders: [
      { price: 30, quantity: 3 },
      { price: 15, quantity: 2 },
      { price: 5, quantity: 1 },
    ],
  }).then((value) => expect(value).toBe(125)));

test('orderTotal_1 - add shipping cost to the order', () =>
  orderTotal_1(null, {
    orders: [
      { price: 30, quantity: 3 },
      { price: 15, quantity: 2 },
      { price: 5, quantity: 2 },
      { shipping: 30 },
    ],
  }).then((value) => expect(value).toBe(160)));

test('orderTotal_1 - fetch country vat then calculate Orders-Cost with custom mock function', () => {
  const fakeAxios = {
    get: (url) => {
      expect(url).toBe('https://jsonplaceholder.typicode.com/todos/20');

      return Promise.resolve({
        data: { id: 20 },
      });
    },
  };

  return orderTotal_1(fakeAxios, {
    countryCode: 20,
    orders: [
      { price: 30, quantity: 3 },
      { price: 15, quantity: 2 },
      { price: 5, quantity: 2 },
      { shipping: 30 },
    ],
  }).then((value) => expect(value).toBe(192));
});

test('orderTotal_2 - fetch country vat then calculate Orders-Cost with module mocking', () => {
  axios.get.mockResolvedValue({ data: { id: 20 } });

  return orderTotal_2({
    countryCode: 20,
    orders: [
      { price: 30, quantity: 3 },
      { price: 15, quantity: 2 },
      { price: 5, quantity: 2 },
      { shipping: 30 },
    ],
  }).then((value) => expect(value).toBe(192));
});
