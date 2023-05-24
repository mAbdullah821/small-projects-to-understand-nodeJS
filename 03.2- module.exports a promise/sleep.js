const sleep = (timeInSeconds, msg) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve.bind(null, msg), timeInSeconds * 1000);
  });
};

module.exports = {
  function: sleep,
  promised: sleep(1, '2- Hello from promised sleep call!'),
};
