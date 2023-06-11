// ------------- <SOLID> ----------------
// S: Single responsibility principle (SRP).
// O: Open–closed principle (OCP).
// L: Liskov substitution principle (LSP).
// I: Interface segregation principle (ISP).
// D: Dependency inversion principle (DIP).

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }
}

// Looks like interface
class SomethingNeedsNotificationService {
  getMessage() {
    // Implement in subClasses
  }
}

class Order extends SomethingNeedsNotificationService {
  constructor(items, price) {
    super();
    this.items = items;
    this.price = price;
  }

  calculateTax() {
    return this.price * 0.1;
  }

  getMessage() {
    return `Order Count: ${this.items.length} - Price: ${
      this.price
    } - Tax: ${this.calculateTax()}`;
  }
}

class Transaction extends SomethingNeedsNotificationService {
  constructor(time, money) {
    super();
    this.time = time;
    this.money = money;
  }

  makeTransaction() {
    // Do something
  }

  getMessage() {
    return `Transaction Time: ${this.time} - Money: ${this.money}`;
  }
}

// Looks like interface
class NotificationService {
  notify(msg) {
    // Implement in subClasses
  }
}

class EmailService extends NotificationService {
  constructor(email) {
    super();
    this.email = email;
  }

  notify(msg) {
    console.log(`Email sent to ${this.email} [With]-> ${msg}`);
  }
}

class SmsService extends NotificationService {
  constructor(phoneNumber) {
    super();
    this.phoneNumber = phoneNumber;
  }

  notify(msg) {
    console.log(`SMS sent to ${this.phoneNumber} [With]-> ${msg}`);
  }
}

class Notifier {
  constructor(somethingNeedsNotificationService, notifier) {
    this.something = somethingNeedsNotificationService;
    this.notifier = notifier;
  }

  sendNotification() {
    this.notifier.notify(this.something.getMessage());
  }
}

const items = [
  new Item('Shirt', 20),
  new Item('Pants', 30),
  new Item('Shoes', 50),
];

// ---------- 1- Choose one type --------------------------------------------------------------
const order = new Order(items, 100);
// const transaction = new Transaction('12-5-2020', 2500);

//----------- 2- Choose one notification service ----------------------------------------------
//
const notificationService = new EmailService('johndoe@example.com');
// const notificationService = new SmsService('01-123-1234-12');

//----------- 3- Choose one type To send notification for (Select same as step 1) -------------
//
const notifier = new Notifier(order, notificationService);
// const notifier = new Notifier(transaction, notificationService);

//----------- 4- Send the notification --------------------------------------------------------
notifier.sendNotification();
