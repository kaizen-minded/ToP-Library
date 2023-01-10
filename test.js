// "use strict";
// const bookshelf = document.querySelector(".bookshelf");
function Library() {
  this.myLibrary = [];
}

const libraryMethods = {
  addBook(book) {
    this.myLibrary.push(book);
  },
  removeBook(id) {
    const updatedLibrary = this.myLibrary.filter((book) => book.id !== id);
    this.myLibrary = updatedLibrary;
  },
};

Library.prototype = Object.create(libraryMethods);

function Book(id, author, title, pages) {
  this.id = id;
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.completed = false;
}

Book.prototype.updateCompleted = function () {
  this.completed = !this.completed;
};

const dune = new Book(1, "Frank Herbert", "Dune", 300);
const harryPotter = new Book(2, "Harry Potter", "Harry Potter", 230);

const newLibrary = new Library();
newLibrary.addBook(dune);
newLibrary.addBook(harryPotter);
// console.log(newLibrary);
newLibrary.removeBook(2);
dune.updateCompleted();
// console.log(newLibrary);
// function updateUI() {
//   myLibrary.forEach((item) => {
//     bookshelf.innerText += item.title;
//   });
// }
console.log(Object.getPrototypeOf(dune));
