const {
  from,
  of,
  map,
  catchError,
  retry,
  throwError,
  concat,
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
