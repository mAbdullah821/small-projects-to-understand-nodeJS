const greet1 = require('./greetingPatterns/greet1');
greet1(); // Hello 1

//------------------------(2)------------------------------------

// const { greet: greet2 } = require('./greetingPatterns/greet2');
const greet2 = require('./greetingPatterns/greet2').greet;
greet2(); // Hello 2

//------------------------(3)------------------------------------

const greet3 = require('./greetingPatterns/greet3');
greet3.greet(); // Hello 3

greet3.greeting = 'Change the message 3';

const greet3Temp = require('./greetingPatterns/greet3');
greet3Temp.greet(); // Change the message 3

//------------------------(4)------------------------------------

const greet4 = new (require('./greetingPatterns/greet4'))();
greet4.greet(); // Hello 4

greet4.greeting = 'Change the message 4';

const greet4Temp = new (require('./greetingPatterns/greet4'))();
greet4Temp.greet(); // Hello 4

//------------------------(5)------------------------------------

const greet5 = new (require('./greetingPatterns/greet5'))();
greet5.greet(); // Hello 5
