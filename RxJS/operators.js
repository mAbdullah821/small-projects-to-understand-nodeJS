const {
  from,
  of,
  map,
  catchError,
  retry,
  throwError,
  concat,
  delay,
  mergeMap,
  concatMap,
  switchMap,
  exhaustMap,
  forkJoin,
  interval,
  take,
  tap,
  Observable,
  takeWhile,
  timer,
  combineLatest,
  endWith,
  sequenceEqual,
  skipWhile,
  iif,
} = require('rxjs');

const stringList = ['memo', 'amo', 'me', 'do'];

// -----> Creating Observables

const observableUsingFrom = () => {
  return from(stringList);
};

const observableUsingOf = () => {
  return of(...stringList);
};

observableUsingFrom().subscribe((value) => console.log(value));

console.log('-----------------');

observableUsingOf().subscribe((value) => console.log(value));

// -----> Transforming Observables

console.log('-----------------');
observableUsingFrom()
  .pipe(map((value, idx) => value + ` ${idx}`))
  .subscribe((value) => console.log(value));

// -----> Error Handling Operators

console.log('-----------------');
concat(
  from(['str1', 'str2']),
  throwError(() => new Error('not data was found')),
  of('str4', 'str5')
)
  .pipe(
    retry(3),
    catchError((val) => of(`I caught: -> ${val}`))
  )
  .subscribe(
    (value) => console.log(value)
    // (err) => console.log(err.message)
  );

// ----->  Map, switchMap, mergeMap, flatMap, concatMap, exhaustMap

const example = (operator) => () => {
  from([0, 1, 2, 3, 4, 5])
    .pipe(operator((value) => of(value).pipe(delay(500))))
    .subscribe({
      next: (value) => console.log(value),
      error: () => {},
      complete: () => console.log(operator.name + ' Completed!'),
    });
};

console.log('-----------------');
// example(mergeMap)(); // like (Promise.all)
// example(concatMap)(); // wait the previous observable before continue
// example(switchMap)(); // cancel previous observable
// example(exhaustMap)(); //

const observer = interval(1000)
  .pipe(
    takeWhile((val) => val < 2),
    switchMap(() => interval(100)),
    mergeMap((val) =>
      iif(
        () => val <= 10,
        of(val),
        tap(() => observer.unsubscribe())
      )
    )

    // skipWhile((val) => val <= 10),
    // ,
    // endWith('Friend')
  )
  .subscribe(console.log);

//TODO: Solve the error in the previous code
