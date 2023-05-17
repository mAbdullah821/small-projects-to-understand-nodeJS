greeting = 'Hello 5';

const Greet = function () {
  this.greet = function () {
    console.log(greeting);
  };
};

module.exports = Greet;
