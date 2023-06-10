class Person {
  constructor(name, age) {
    this._name = name;
    this._age = age;
  }

  set setName(name) {
    this._name = name;
  }

  get getName() {
    return this._name;
  }

  set setAge(age) {
    this._age = age;
  }

  get getAge() {
    return this._age;
  }

  static sayHello(name, age) {
    console.log(`Hello, from me ${name}, with age: ${age}`);
  }

  printInfo() {
    console.log(`myName is: ${this.getName} || myAge is: ${this.getAge}`);
  }
}

class Student extends Person {
  constructor(name, age, GPA) {
    super(name, age);
    this._GPA = GPA;
  }

  set setGPA(GPA) {
    this._GPA = GPA;
  }

  get getGPA() {
    return this._GPA;
  }

  printInfo() {
    super.printInfo();
    console.log(`myGPA is: ${this.getGPA}`);
  }
}

const student1 = new Student('memo', 18, 3.2);
student1.printInfo();

console.log('-----------------');
student1.setAge = 25;
Person.sayHello(student1.getName, student1.getAge);
