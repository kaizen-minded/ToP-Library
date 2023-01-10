// "use strict";
const bookshelf = document.querySelector(".bookshelf");
const myLibrary = [];

function Library() {
  this.myLibrary = [];
}

function Book(author, title, pages) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.completed = false;
}

Book.prototype.add = function () {
  addBookToLibrary(this);
};

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function updateUI() {
  myLibrary.forEach((item) => {
    bookshelf.innerText += item.title;
  });
}
const dune = new Book("Frank Herbert", "Dune", 300);
const harryPotter = new Book("Harry Potter", "Harry Potter", 230);

dune.add();
harryPotter.add();

// updateUI();

// const template = document.getElementById("bookTemplate");

// const clone = template.content.cloneNode(true);
// clone.querySelector(".book__title").innerText = "Does it work";
// clone.querySelector(".book__author").innerText = "Jazzy Martin";
// clone.querySelector(".book").setAttribute("data-id", "1");
// console.log(clone.querySelector(".book"));
// document.querySelector(".bookshelf").appendChild(clone);

// Modal controls
const modal = document.querySelector("#modal");
const openModal = document.querySelector(".btn--open");
const closeModal = document.querySelector(".btn--close");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});
