const obj = {
  firstName: 'Mario',
  greeting: function (lastName) {
    console.log(`Hello, ${this.firstName} ${lastName}`);
  },
};

obj.greeting('Woo!');

obj.greeting.call({ firstName: 'John' }, 'Doe');
obj.greeting.apply({ firstName: 'Jane' }, ['Deco']);
