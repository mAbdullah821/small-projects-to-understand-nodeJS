const Person = {
  firstName: '',
  lastName: '',
  greet: function () {
    console.log(`Hello, ${this.firstName} ${this.lastName}`);
  },
};

const me = Object.create(Person);
me.firstName = 'Hello';
me.lastName = 'World';

me.greet();

const you = Object.create(Person);
you.firstName = 'Mero';
you.lastName = 'Maro';

you.greet();
