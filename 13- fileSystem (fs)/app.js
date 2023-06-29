const fs = require('fs');

fs.readFile(__dirname + '/text.txt', (err, bufferData) => {
  if (err) console.log(err);
  console.log('not using the [utf8] option: --> ', bufferData);
  console.log(
    'use .toString to convert buffer into plain text: --> ',
    bufferData.toString('utf8')
  );
});

//-------------- 2 -------------
fs.readFile(__dirname + '/text.txt', 'utf8', (err, data) => {
  if (err) console.log(err);
  console.log('-------------- 2 -------------');
  console.log('uses the [utf8] option: ==> ', data);
});
