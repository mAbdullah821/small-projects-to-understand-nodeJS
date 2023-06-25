const { Worker } = require('worker_threads');

// Benchmarking with 1 to 1000 threads... [In my 2 core CPU 2.90GHz with 4 logical threads]

function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__dirname + '/worker.js');
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}

async function main() {
  const numThreads = 100;
  console.log(`Benchmarking with 1 to ${numThreads} threads...`);
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
