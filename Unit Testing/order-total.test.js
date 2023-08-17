const axios = require('axios');
const { orderTotal_1, orderTotal_2 } = require('./order-total.js');

jest.mock('axios');

test('Correct orders cost', () =>
  orderTotal_1(null, {
    orders: [{ price: 30 }, { price: 15 }, { price: 5 }],
  }).then((value) => expect(value).toBe(50)));

test('add quantity to the order', () =>
  orderTotal_1(null, {
    orders: [
      { price: 30, quantity: 3 },
      { price: 15, quantity: 2 },
      { price: 5, quantity: 1 },
    ],
  }).then((value) => expect(value).toBe(125)));

test('add shipping cost to the order', () =>
  orderTotal_1(null, {
    orders: [
      { price: 30, quantity: 3 },
      { price: 15, quantity: 2 },
      { price: 5, quantity: 2 },
      { shipping: 30 },
    ],
  }).then((value) => expect(value).toBe(160)));

test('fetch country vat then calculate Orders-Cost with custom mock function', () => {
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

test('fetch country vat then calculate Orders-Cost with module mocking', () => {
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

// const myMock2 = jest.fn();
// const a = { a: 123 };
// const bound1 = myMock2.bind(a);
// bound1();
// const b = { b: 123 };
// const bound = myMock2.bind(b);
// bound();
console.log('-------------------------');
// console.log(myMock2.mock.contexts);

// const myMock1 = jest.fn();
// myMock1.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);
// // const c = new myMock1({ name: 'memo' });
// // console.log(myMock1.mock.instances[0]);
// console.log(myMock1(), myMock1());

const filterTestFn = jest.fn();

// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter((num) => filterTestFn(num * 2));

console.log(result);
console.log(filterTestFn.mock.calls[0][0]); // 11
console.log(filterTestFn.mock.calls[1][0]); // 12
