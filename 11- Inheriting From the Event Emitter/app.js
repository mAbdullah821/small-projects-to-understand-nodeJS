const eventEmitter = require('events');
//------------------------------
// const util = require('util');

// const Greet = function () {
//   eventEmitter.call(this);
//   this.greeting = 'Hello, ';
// };

// util.inherits(Greet, eventEmitter);

// Greet.prototype.greet = function (person) {
//   console.log(this.greeting + person);
//   this.emit('greet', person);
// };
//------------------------------

class Greet extends eventEmitter {
  constructor() {
    super();
    this.greeting = 'Hello, ';
  }

  greet(person) {
    console.log(this.greeting + person);
    this.emit('greet', person);
  }
}

const greet = new Greet();

greet.on('greet', function (person) {
  console.log(person + ' was greeted!');
});

greet.greet('Maro');
