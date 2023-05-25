const { Buffer } = require('buffer');

// ------> CheckPoint
console.log('-------------- 1- Buffer.alloc ------------');
const buf0 = Buffer.alloc(12);
buf0.fill(5);
console.log('Fill the Buffer bytes with the value(5): ', buf0);

buf0.write('hello world!');
buf0[0] = 'H'.charCodeAt(0);
buf0[6] = 'W'.charCodeAt(0);
console.log('write "Hello World!" to the buffer: ', buf0.toString('utf8'));

// ------> CheckPoint
console.log('\n-------------- 2- Buffer.from(string) ------------');
const buf1 = Buffer.from('Hello', 'utf8');
console.log('Buffers: ', buf1);
console.log('Plain Text: ', buf1.toString('utf8'));
console.log('JSON: ', buf1.toJSON());
console.log('Element base10: ', buf1[0]);

buf1.write('Wo'); // like a ring buffer
console.log('Text after write(Wo): ', buf1.toString('utf8'));

// ------> CheckPoint
console.log(
  '\n-------------- 3- Buffer.from(array[charCodes(decimal)], hex) ------------'
);
const buf2 = Buffer.from([72, 101, 108, 108, 111, 50], 'hex');
console.log('Buffers: ', buf2);
console.log('Plain Text: ', buf2.toString('utf8'));

// ------> CheckPoint
console.log(
  '\n-------------- 4- Buffer.from(stringCode(hex), hex) ------------'
);
const buf3 = Buffer.from('E4BDA0E5A5BD', 'hex');
console.log('Buffers: ', buf3);
console.log('Plain Text(hello):--> ', buf3.toString('utf8'));

// ------> CheckPoint
console.log('\n-------------- 5- buffer.equals ------------');
const buf41 = Buffer.from('ABC', 'utf8');
const buf42 = Buffer.from('414243', 'hex');
console.log('does [buf41] === [buf42]? ', buf41.equals(buf42));

// ------> CheckPoint
console.log('\n-------------- 6- ArrayBuffer ------------');
const buffer = new ArrayBuffer(8); // create 8 bytes and initialize them all with 0s
console.log(buffer);

const arrayView = new Int32Array(buffer); // create and integer array view

arrayView[0] = 10;
console.log('set arr[0]=10: ', arrayView); // view all the buffer array
arrayView[1] = 11;
console.log('set arr[1]=11: ', arrayView);

console.log('arr[0]: ', arrayView[0], ' | arr[1]: ', arrayView[1]);
