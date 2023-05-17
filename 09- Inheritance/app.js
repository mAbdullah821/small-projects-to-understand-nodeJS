//-----------------------------------------------------------
// ----------------- first way to build class inheritance
//-----------------------------------------------------------

// const Person = function () {
//   this.name = 'Hello World';
// };

// Person.prototype.printMyName = function () {
//   const welcome = 'Welcome!, ';
//   console.log(welcome, this.name);
// };

// const Me = function () {
//   // When inheritance occurs in JavaScript, it's the prototype methods that are inherited by the child class, not the class attributes. Therefore, to add the parent class attributes to the child class, we need to explicitly use parentClass.call(this) in the child class constructor.

//   Person.call(this);
//   this.age = 10;
// };

// Me.prototype = Object.create(Person.prototype);

// Me.prototype.displayMyInfo = function () {
//   this.printMyName();
//   console.log('age: ' + this.age);
// };

//-----------------------------------------------------------
// ----------------- Second way to build class inheritance
//-----------------------------------------------------------
'use strict';

class Person {
  constructor() {
    this.name = 'Hello World';
  }

  printMyName() {
    const welcome = 'Welcome!, ';
    console.log(welcome, this.name);
  }
}

class Me extends Person {
  constructor() {
    // inheritance only connects the prototypes.

    // In JavaScript, a child class has a reference to the parent class's methods, which helps to optimize memory usage by reducing the need for unique copies of methods for each new object. However, if a child class overrides a parent method, the overridden method will only apply to the child class and not affect the parent class.

    // This means that if a second child class inherits from the same parent class, it will use the original method definition from the parent class instead of the overridden method from the first child class.

    // when a child class inherits from a parent class, it only inherits the methods that are defined in the parent class's prototype. If the parent class has attributes that are initialized in its constructor, those attributes will not be automatically inherited by the child class. To ensure that the child class has access to those attributes, we need to explicitly call the parent class constructor using super() in the child class constructor, before defining any child class attributes.

    super();
    this.age = 10;
  }

  displayMyInfo() {
    this.printMyName();
    console.log('age: ' + this.age);
  }
}

const mySelf = new Me();

console.dir(mySelf);
mySelf.displayMyInfo();
// ----- create a new variable in the (mySelf) object, with a name [displayMyInfo], the origin [displayMyInfo] function will not change (will remain as it is);

// mySelf.printMyName = newFunction();

mySelf.printMyName.coco = '1010';
mySelf.printMyName.age = 10;
console.log(mySelf.printMyName.coco + ' |:| ' + mySelf.printMyName.age);

const mySelf2 = new Me();
console.log(mySelf2.printMyName);
