const sleep = require('./sleep');

(async () => {
  console.log(await sleep.function(1, '1- Hello from function sleep call!'));
  console.log(await sleep.promised);
})();
