const { Worker } = require('worker_threads');

// Benchmarking with 10 threads... [In my 2 core CPU 2.90GHz with 4 logical threads]
// 1 Threads: 17757ms
// 2 Threads: 9492ms
// 3 Threads: 6392ms
// 4 Threads: 5409ms
// 5 Threads: 5151ms
// 6 Threads: 5290ms
// 7 Threads: 5364ms
// 8 Threads: 5312ms
// 9 Threads: 5319ms
// 10 Threads: 5731ms
// Benchmark complete.

function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__dirname + '/worker.js');
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}

async function main() {
  const numThreads = 100;
  console.log(`Benchmarking with ${numThreads} threads...`);
  for (let i = 1; i <= numThreads; i++) {
    const start = Date.now();
    const promisesArray = [];

    for (let j = 0; j < i; j++) promisesArray.push(createWorker());

    await Promise.all(promisesArray);
    const end = Date.now();

    console.log(`${i} threads took ${end - start}ms`);
  }
}

main().catch(console.error);
