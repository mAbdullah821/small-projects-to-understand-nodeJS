const { Observable, filter } = require('rxjs');

const observable = new Observable((subscriber) => {
  const interval = setInterval(() => {
    console.log(1);
    subscriber.next('hello');
    subscriber.next('world');
    subscriber.next('war');
    subscriber.next('memo');
  }, 500);

  // setTimeout(() => subscriber.error('Random error message!'), 2000);
  setTimeout(() => subscriber.complete(), 2500);
  setTimeout(() => subscriber.next('Will not produced'), 2800);

  return {
    unsubscribe: () => {
      // --> Called after:
      //                    error
      //                    complete
      //                    custom Call
      clearInterval(interval);
    },
  };
});

const onDestroy = (subscription) => {
  setTimeout(() => subscription.unsubscribe(), 5000);
};

const subscriber = observable
  .pipe(
    filter((value, idx) => {
      // console.log(value, idx);
      return idx % 2 === 0;
    }),
    filter((value) => {
      // console.log(value + ' ' + value);
      return value.startsWith('hell');
    })
  )
  .subscribe({
    next: (value) => console.log(value),
    error: (err) => console.log(err),
    complete: () => console.log('Done!'),
  });

onDestroy(subscriber);
