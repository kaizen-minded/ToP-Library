function Hero(name, level) {
  this.name = name;
  this.level = level;
}

Hero.prototype.greet = function () {
  return `${this.name} says hello.`;
};

function Warrior(name, level, weapon) {
  // Chain constructor with call
  Hero.call(this, name, level);

  // Add a new property
  this.weapon = weapon;
}

// Initialize Healer constructor
function Healer(name, level, spell) {
  Hero.call(this, name, level);

  this.spell = spell;
}

[Warrior, Healer].forEach((user) => {
  Object.setPrototypeOf(user.prototype, Hero.prototype);
});

Warrior.prototype.attack = function () {
  return `${this.name} attacks with the ${this.weapon}.`;
};
Healer.prototype.heal = function () {
  return `${this.name} casts ${this.spell}.`;
};

const hero1 = new Warrior("Bjorn", 1, "axe");
const hero2 = new Healer("Kanin", 1, "cure");

// console.log(hero1.hasOwnProperty("name"));
// console.log(hero1.greet());
// console.log(hero2.greet());
// console.log(hero1.attack());
// console.log(hero2.heal());

function Library() {
  this.library = new Map();
  this.bookStats = {
    totalBooks: 0,
    booksFinished: 0,
    totalPagesRead: 0,
    completionScore: 0,
  };
}

// needs methods for create, delete, update
const libraryMethods = {
  addBook(id, book) {
    this.library.set(id, book);
  },
  deleteBook(id) {
    this.library.delete(id);
  },
  updateBook(id, bool) {
    this.library.get(id).completed = bool;
    // this.library.set(id, {...this.library.get(id), completed: bool})
  },
};

const bookMethods = {
  getBookArray() {
    return Array.from(this.library.values());
  },
  // get book stats
  setTotalBooks() {
    this.bookStats.totalBooks = this.library.size;
  },
  setCompletedBooks() {
    const numOfCompleted = this.getBookArray().filter(
      (book) => book.completed
    ).length;
    this.bookStats.booksFinished = numOfCompleted;
  },
  //calculate total pages read
  getTotalPagesRead() {
    return this.getBookArray().reduce(
      (acc, curr) => (acc += curr.completed ? curr.pages : 0),
      0
    );
  },
  // calculate completion
  setCompeletionScore() {
    let { totalBooks, booksFinished } = bookStats;
    this.bookStats.completionScore = (booksFinished / totalBooks) * 100;
  },
};

Library.prototype = Object.create({ ...libraryMethods, ...bookMethods });

const myLibrary = new Library();
myLibrary.addBook(1, {
  title: "Book",
  author: "Kevin",
  pages: 100,
  completed: false,
});
myLibrary.addBook(2, {
  title: "Book 2",
  author: "Kim",
  pages: 200,
  completed: false,
});
// myLibrary.deleteBook(1)
myLibrary.updateBook(2, true);
myLibrary.setTotalBooks();
myLibrary.setCompletedBooks();
console.dir(myLibrary);
// console.log(myLibrary.getTotalPagesRead())

function UI() {
  // needs the array from the Library function to work properly
  // need a way to create a card
  // send an array of cards to the DOM
  // update stats on the DOM
}
