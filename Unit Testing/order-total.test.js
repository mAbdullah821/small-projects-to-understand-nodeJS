const axios = require('axios');
const { orderTotal_1, orderTotal_2 } = require('./order-total.js');

jest.mock('axios');
describe('orderTotal_1', () => {
  it('Should return cost = 50', () =>
    orderTotal_1(null, {
      orders: [{ price: 30 }, { price: 15 }, { price: 5 }],
    }).then((value) => expect(value).toBe(50)));

  it('Should use the product quantity while calculating the cost and is should return cost = 125', () =>
    orderTotal_1(null, {
      orders: [
        { price: 30, quantity: 3 },
        { price: 15, quantity: 2 },
        { price: 5, quantity: 1 },
      ],
    }).then((value) => expect(value).toBe(125)));

  it('Should add the shipping cost while calculating the cost and it should return cost = 160', () =>
    orderTotal_1(null, {
      orders: [
        { price: 30, quantity: 3 },
        { price: 15, quantity: 2 },
        { price: 5, quantity: 2 },
        { shipping: 30 },
      ],
    }).then((value) => expect(value).toBe(160)));

  it('Should add the country VAT while calculating the cost and it should return the cost = 192 (fake mocking function)', () => {
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
});

describe('orderTotal_2', () => {
  it('Should add the country VAT while calculating the cost and it should return the cost = 192 (module mocking)', () => {
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
});
