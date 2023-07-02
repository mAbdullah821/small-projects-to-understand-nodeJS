class Prototype {
  constructor() {}
  clone() {
    throw new Error('Please implement the function');
  }
}

class Customer extends Prototype {
  #privateCode = 0;
  #options = {
    getInfoInvokeCount: 0,
  };

  constructor(name, age, money) {
    super();
    this.name = name;
    this.age = age;
    this.money = money;
  }

  #getPrivateCode() {
    if (!this.#privateCode)
      this.#privateCode = 821 * Math.floor(Math.random() * 1000);
  }

  getInfoString() {
    return `- Name: ${this.name}\n- Age: ${this.age}\n- Money: ${
      this.money
    }\n- Private Code: ${this.#privateCode}\n- getInfo invoked: ${
      this.#options.getInfoInvokeCount
    } times`;
  }

  getInfo() {
    this.#getPrivateCode();
    this.#options.getInfoInvokeCount += 1;

    console.log(this.getInfoString());
  }

  #clonePrivateAttributes(customer) {
    customer.#privateCode = this.#privateCode;
    customer.#options = { ...this.#options };
  }

  clone(toCustomer = null) {
    if (!toCustomer) {
      const newCustomer = new Customer(this.name, this.age, this.money);
      this.#clonePrivateAttributes(newCustomer);

      return newCustomer;
    } else {
      toCustomer.name = this.name;
      toCustomer.age = this.age;
      toCustomer.money = this.money;
      this.#clonePrivateAttributes(toCustomer);

      return toCustomer;
    }
  }
}

class GoodCustomer extends Customer {
  constructor(name, age, money, goodRate) {
    super(name, age, money);
    this.goodRate = goodRate;
  }

  getInfoString() {
    return super.getInfoString() + `\n- Good rate: ${this.goodRate}`;
  }

  clone(toGoodCustomer = null) {
    if (!toGoodCustomer) {
      const newGoodCustomer = new GoodCustomer('', 0, 0, this.goodRate);
      super.clone(newGoodCustomer);

      return newGoodCustomer;
    } else {
      toGoodCustomer.goodRate = this.goodRate;
      super.clone(toGoodCustomer);

      return toGoodCustomer;
    }
  }
}

module.exports = GoodCustomer;
