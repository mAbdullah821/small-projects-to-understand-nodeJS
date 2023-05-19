const { Buffer } = require('buffer');

const buf = Buffer.from('Hello', 'utf8');
console.log('Buffers: ', buf);
console.log('Plain Text: ', buf.toString('utf8'));
console.log('JSON: ', buf.toJSON());
console.log('Element base10: ', buf[0]);

buf.write('Wo'); // like a ring buffer
console.log('Text after write(Wo): ', buf.toString('utf8'));

// ------------------ ArrayBuffer -------------------
const buffer = new ArrayBuffer(8); // create 8 bytes and initialize them all with 0s
console.log(buffer);

const arrayView = new Int32Array(buffer); // create and integer array view

arrayView[0] = 10;
console.log('set arr[0]=10: ', arrayView); // view all the buffer array
arrayView[1] = 11;
console.log('set arr[1]=11: ', arrayView);

console.log('arr[0]: ', arrayView[0], ' | arr[1]: ', arrayView[1]);
