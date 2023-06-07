const { parentPort, workerData } = require('worker_threads');
const result = performTask();
parentPort.postMessage(result);

function performTask() {
  let result = 0;
  const start = workerData.start;
  const end = workerData.end;
  for (let i = start; i < end; i++) {
    result += i;
  }
  return result;
}
