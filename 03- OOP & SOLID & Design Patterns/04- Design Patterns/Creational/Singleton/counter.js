class Counter {
  static #isInternalConstructing = false;
  static #instance = null;
  #counter;

  constructor() {
    if (!Counter.#isInternalConstructing) {
      throw new TypeError('Private Constructor is not constructable');
    }

    this.#counter = 0;
  }

  static getInstance() {
    if (!Counter.#instance) {
      Counter.#isInternalConstructing = true;

      Counter.#instance = new Counter();

      Counter.#isInternalConstructing = false;
    }

    return Counter.#instance;
  }

  increaseCounter() {
    this.#counter += 1;
  }

  get counter() {
    return this.#counter;
  }
}

module.exports = Counter;
