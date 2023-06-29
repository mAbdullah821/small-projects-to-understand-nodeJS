const Counter = require('./counter');

const counter1 = Counter.getInstance();
counter1.increaseCounter();

const counter2 = Counter.getInstance();
counter1.increaseCounter();

const counter3 = Counter.getInstance();
counter1.increaseCounter();

console.log(counter1.counter);
console.log(counter2.counter);
console.log(counter3.counter);
