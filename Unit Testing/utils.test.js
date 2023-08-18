const {
  getObject,
  asyncGetObject,
  applyDiscount,
  fetchOrder,
} = require('./utils');
const axios = require('axios');
const db = require('./db');

describe('getObject', () => {
  it('Should return an object with id = 1', () => {
    expect(getObject(1)).toEqual(
      expect.objectContaining({ id: 1, price: expect.any(Number) })
    );

    expect(getObject(1)).toMatchObject({ id: 1, price: 50 });

    expect(getObject(1)).toHaveProperty('isGood');
  });

  it('Should throw error if the id is not defined', () => {
    expect(() => getObject()).toThrow();
    expect(() => getObject()).toThrowError('id is not defined!'); // Note: Full error message not required
  });
});

describe('asyncGetObject', () => {
  it('Should return an object with id = 1', async () => {
    const result = await asyncGetObject(1);
    expect(result).toContainEqual({ id: 1, price: 50, isGood: true });

    expect(await asyncGetObject(1)).toContainEqual({
      id: 1,
      price: 50,
      isGood: true,
    });

    expect(asyncGetObject(1)).resolves.toContainEqual({
      id: 1,
      price: 50,
      isGood: true,
    });
  });

  it('Should throw error if the id is not defined', async () => {
    expect(asyncGetObject()).rejects.toThrowError('id is not defined!');
  });
});

describe('applyDiscount', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should apply 10% discount for price: 10', () => {
    const id = 1;
    const targetOrder = { id, price: 10 };
    const resultOrder = { id, price: 9 };

    const getOrder = jest.spyOn(db, 'getOrder').mockReturnValue(targetOrder);
    updateOrder = jest.spyOn(db, 'updateOrder');

    expect(applyDiscount(id)).toMatchObject(resultOrder);

    expect(getOrder.mock.calls.length).toBe(1);
    expect(getOrder.mock.calls[0][0]).toBe(id);

    expect(updateOrder).toHaveBeenCalled(); // calls.length = 1
    expect(updateOrder).toHaveBeenCalledWith(resultOrder); // toEqual(resultOrder) --- exact match (no reference)

    // db.getOrder.mockRestore();
    // db.updateOrder.mockRestore();
  });

  it('Should not apply 10% discount for price: 5', () => {
    const id = 1;

    const getOrder = jest.spyOn(db, 'getOrder').mockImplementation((id) => {
      return { id, price: 5 };
    });

    expect(applyDiscount(id)).toMatchObject({ id, price: 5 });

    // db.getOrder.mockRestore();
  });
});

jest.mock('axios');

describe('fetchOrder', () => {
  it('Should return the order data', () => {
    const id = 1;
    axios.get.mockResolvedValue({ data: { id, userId: id } });

    expect(fetchOrder(id)).resolves.toEqual({ id, userId: id });
  });
});
