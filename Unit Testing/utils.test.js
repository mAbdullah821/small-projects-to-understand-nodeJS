const { getObject, asyncGetObject } = require('./utils');

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
