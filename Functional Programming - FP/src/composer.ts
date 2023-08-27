export class Composer<T1, T2> {
  f: (a: T1) => T2;
  constructor(fun: (a: T1) => T2) {
    this.f = fun;
  }

  compose<T3>(g: (inp: T2) => T3): Composer<T1, T3> {
    return new Composer((a: T1) => g(this.f(a)));
  }

  exec(a: T1): T2 {
    return this.f(a);
  }
}
