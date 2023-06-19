const emitter = require('./add_some_listeners_to_event_emitter');
const { events } = require('./config');

const listener3 = function () {
  console.log('hello from listener 3');
};

emitter.on(events.GREET, listener3);
//--------------------
const x = 10;

if (x >= 10) emitter.emit(events.GREET);
else console.log('nothing is happening');
