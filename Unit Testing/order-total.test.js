import { orderTotal } from './order-total';

test('Correct orders cost', () =>
  orderTotal(null, {
    orders: [{ price: 30 }, { price: 15 }, { price: 5 }],
  }).then((value) => expect(value).toBe(50)));

test('add quantity to the order', () =>
  orderTotal(null, {
    orders: [
      { price: 30, quantity: 3 },
      { price: 15, quantity: 2 },
      { price: 5, quantity: 1 },
    ],
  }).then((value) => expect(value).toBe(125)));

test('add shipping cost to the order', () =>
  orderTotal(null, {
    orders: [
      { price: 30, quantity: 3 },
      { price: 15, quantity: 2 },
      { price: 5, quantity: 2 },
      { shipping: 30 },
    ],
  }).then((value) => expect(value).toBe(160)));

test('fetch country vat then calculate Orders-Cost', () => {
  const fakeFetch = (url) => {
    expect(url).toBe('https://jsonplaceholder.typicode.com/todos/20');

    return Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 20,
        }),
    });
  };

  return orderTotal(fakeFetch, {
    countryCode: 20,
    orders: [
      { price: 30, quantity: 3 },
      { price: 15, quantity: 2 },
      { price: 5, quantity: 2 },
      { shipping: 30 },
    ],
  }).then((value) => expect(value).toBe(192));
});
