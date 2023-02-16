// DOM methods
function UI() {
  this.main = document.querySelector('main');
  const addBtn = document.querySelector('#add-book');
  // addBtn.addEventListener('onClick', )
}

function propertyToPara(book, property) {
  const p = document.createElement('p');
  p.textContent = book[property];
  if (property === 'pages') p.textContent += ' pages';
  return p;
}

function isReadSwitch(isReadVar) {
  const isReadElement = isReadVar;
  const isRead = isReadElement.textContent;

  switch (isRead) {
    case 'true':
      isReadElement.textContent = 'Read';
      break;
    case 'false':
      isReadElement.textContent = 'Not Read';
      break;
    default:
      break;
  }

  return isReadElement;
}

UI.prototype.addBook = function (book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const title = propertyToPara(book, 'title');
  title.classList.add('book-title');
  const author = propertyToPara(book, 'author');
  const pages = propertyToPara(book, 'pages');
  const isRead = isReadSwitch(propertyToPara(book, 'isRead'));

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(isRead);

  this.main.appendChild(bookCard);
};

// Library class and methods
function Library() {
  this.books = [];
}

Library.prototype.addBook = function (book) {
  this.books.push(book);
};

// Book class and methods
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Program flow

const library = new Library();
const ui = new UI();

// Temp books
for (let i = 1; i <= 10; i += 1) {
  const book = new Book('100 Years of Solitude', 'Gabriel Garcia Marquez', 300, true);
  library.addBook(book);
}

library.books.forEach((book) => ui.addBook(book));
