const Emitter = require('./emitter');

const listener1 = function () {
  console.log('hello from listener 1');
};
const listener2 = function () {
  console.log('hello from listener 2');
};

const emitter = new Emitter();

emitter.on('greet', listener1);
emitter.on('greet', listener2);

module.exports = emitter;
