import { Composer } from './composer';

const addOne = (a: number): number => {
  return a + 1;
};

const addTwo = (a: number): number => {
  return a + 2;
};

const addThree = (a: number): number => {
  return a + 3;
};

const addPrefix = (str: string): string => {
  return '<=<*>=> ' + str;
};

const stringToNumber = (str: string): number => {
  return str.length;
};

const numberToString = (num: number): string => {
  return 'Q'.repeat(num + 1);
};

const composed = new Composer(addOne).compose(addTwo).compose(addThree).compose(addOne);
console.log(composed.exec(5));
console.log(new Composer(addPrefix).compose(addPrefix).compose(addPrefix).exec('init'));
console.log(new Composer(numberToString).compose(stringToNumber).compose(addThree).compose(numberToString).exec(5));
