const greet = function () {
  console.log('hello world1');
};

exports.greet = greet;

console.log(exports);
console.log(module.exports);
