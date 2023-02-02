"use strict";

function Library() {
  this.library = new Map();
}

const libraryMethods = {
  addBook(id, book) {
    this.library.set(id, { ...book, id });
  },
  deleteBook(id) {
    this.library.delete(id);
  },
  updateBook(id, bool) {
    this.library.get(id).completed = bool;
  },
  getBook(id) {
    return this.library.get(id);
  },
  getBookArray() {
    return Array.from(this.library.values());
  },
  getLibraryStats() {
    return this.libraryStats;
  },
  getTotalBooks() {
    return this.library.size;
  },
  getTotalOfCompletedBooks() {
    return this.getBookArray().filter((book) => book.completed).length;
  },
  getTotalPagesRead() {
    return this.getBookArray().reduce(
      (acc, curr) => (acc += curr.completed ? parseInt(curr.pages) : 0),
      0
    );
  },
  getCompeletionScore() {
    return this.getTotalBooks() === 0
      ? 0
      : Math.floor(
          (this.getTotalOfCompletedBooks() / this.getTotalBooks()) * 100
        );
  },
};

Library.prototype = Object.create(libraryMethods);

function ViewUI() {
  this.template = document.getElementById("bookTemplate");
  this.bookshelf = document.querySelector(".bookshelf");
  this.totalBooks = document.querySelector("[data-book-total]");
  this.completedBooks = document.querySelector("[data-completion-total]");
  this.completionPercentage = document.querySelector(
    "[data-completion-percentage]"
  );
  this.pagesRead = document.querySelector("[data-pages-read]");
}

const uiMethods = {
  updateBookshelfUI(libraryArray) {
    this.bookshelf.innerText = "";
    const bookNodes = libraryArray.map((book) => this.createCard(book));
    this.bookshelf.append(...bookNodes);
  },
  createCard({ author, title, pages, id, completed } = {}) {
    // FIX: pages and completed
    const clone = this.template.content.cloneNode(true);
    clone.querySelector(".book__title").innerText = title;
    clone.querySelector(".book__author").innerText = `By: ${author}`;
    clone.querySelector(".book__pages").innerText = `Pages: ${pages}`
    clone.querySelector("[type=checkbox]").checked = completed;
    clone.querySelector(".book").setAttribute("data-book-completed", completed);
    clone.querySelector(".book").setAttribute("data-bookId", id);
    return clone;
  },
  updateBookTotalUI(totalBooks) {
    this.totalBooks.innerText = `Total Books: ${totalBooks}`;
  },
  updateCompletedBooksUI(number) {
    this.completedBooks.innerText = `Books Completed: ${number}`;
  },
  updateCompletionPercentageUI(percentage) {
    this.completionPercentage.innerText = `Completion percetage: ${percentage}%`;
  },
  updatePagesReadUI(pages) {
    this.pagesRead.innerText = `Pages Read: ${pages}`;
  },
};

ViewUI.prototype = Object.create(uiMethods);

function Controller(model, view) {
  this.model = model;
  this.view = view;

  this.bookshelf = document.querySelector(".bookshelf");
  this.bookshelf.addEventListener("click", (e) => {
    let bookCard = e.target.closest(".book");
    if (bookCard) {
      if (e.target.nodeName == "INPUT" || e.target.nodeName == "LABEL") {
        // TODO
        const bool = bookCard.dataset.bookCompleted === "true" ? false : true;
        this.model.updateBook(bookCard.dataset.bookid, bool);
      }
      if (e.target.nodeName == "I" || e.target.nodeName == "BUTTON") {
        this.model.deleteBook(bookCard.dataset.bookid);
      }
      this.handleUpdatingUI();
    }
  });

  this.bookForm = document.querySelector(".book-form");
  this.bookForm.addEventListener("submit", (e) => {
    this.handleSubmission(e);
    this.handleUpdatingUI();
  });
}

const controllerMethod = {
  handleSubmission(e) {
    e.preventDefault();
    this.model.addBook(genereateBookId(), this.getFormData());
    // I'll need to clear the form and focus back to the title or close the modal
  },
  getFormData() {
    const { title, author, pages } = this.bookForm;
    return {
      title: title.value,
      author: author.value,
      pages: pages.value,
      completed: false,
    };
  },
  handleUpdatingUI() {
    this.view.updateBookshelfUI(this.model.getBookArray());
    this.view.updateBookTotalUI(this.model.getTotalBooks());
    this.view.updateCompletedBooksUI(this.model.getTotalOfCompletedBooks());
    this.view.updateCompletionPercentageUI(this.model.getCompeletionScore());
    this.view.updatePagesReadUI(this.model.getTotalPagesRead());
  },
  testingCompletedBooks() {
    this.view.updateCompletedBooksUI(this.model.getTotalOfCompletedBooks());
  },
};

Controller.prototype = Object.create(controllerMethod);

const init = new Controller(new Library(), new ViewUI());

// Utility functions
function genereateBookId() {
  return `${Date.now().toString(36) + Math.random().toString(36).substring(2)}`;
}

function updateInnerText(element, text) {
  element.innerText = text;
}

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
