const { parentPort } = require('worker_threads');
for (let i = 0; i < 100; i++);
parentPort.postMessage('Finish Executing');
