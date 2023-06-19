const emitter = require('./add_some_listeners_to_event_emitter');

const listener3 = function () {
  console.log('hello from listener 3');
};

emitter.on('greet', listener3);
//--------------------
const x = 10;

if (x >= 10) emitter.emit('greet');
else console.log('nothing is happening');
