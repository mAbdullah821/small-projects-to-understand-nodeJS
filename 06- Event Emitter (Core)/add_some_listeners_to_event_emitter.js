const Emitter = require('events');
const { events } = require('./config');

const listener1 = function () {
  console.log('hello from listener 1');
};

const listener2 = function () {
  console.log('hello from listener 2');
};

const emitter = new Emitter();

emitter.on(events.GREET, listener1);
emitter.on(events.GREET, listener2);

module.exports = emitter;
