const GoodCustomer = require('./customer');

const customer1 = new GoodCustomer('memo', 18, 1800, 3.5);

console.log('1) ------ > Customer1 < ------');
customer1.getInfo();

const customer2 = customer1.clone();
console.log('2) ------ > Customer2 < ------ || Copy from (1) unchanged.');
customer2.getInfo();

console.log(
  '3) ------ > Customer2 < ------ || Like (2) with modifications (name, age).'
);
customer2.name = 'Hello world';
customer2.age = 25;
customer2.getInfo();

console.log('4) ------ > Customer1 < ------ || Same as (1)');
customer1.getInfo();

console.log('5) ------ > Customer3 < ------ || Copy from (2) unchanged.');
// Exclude real values as they will be replaced in subsequent copy.
const customer3 = new GoodCustomer('n/a');
customer2.clone(customer3);
customer3.getInfo();

console.log(
  '6) ------ > Customer3 < ------ Like (5) with modifications (money, goodRate).'
);
customer3.money = 3333;
customer3.goodRate = 4.1;
customer3.getInfo();

console.log('7) ------ > Customer2 < ------ Same as (3)');
customer2.getInfo();
