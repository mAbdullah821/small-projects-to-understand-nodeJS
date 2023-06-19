const print = require('./module');
print();

print.x = 10;

const print2 = require('./module');

console.log(print2.x);

// this reference to [module.exports]

module.exports.hello = 'World ^_^:';
console.log(this);
