// DOM elements
const body = document.querySelector('body');
const main = document.querySelector('main');
const addBtn = document.querySelector('#add-book');

// DOM methods
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

// Library class and methods
function Library() {
  this.books = [];
}

Library.prototype.addBook = function (book) {
  this.books.push(book);
};

// Library instatiated

const library = new Library();

function deleteBook(e) {
  const card = e.target.parentElement;
  const index = card.dataset.id;

  library.books.splice(index, 1);

  updateBookList();
}

function updateBookList() {
  main.textContent = '';

  for (let i = 0; i < library.books.length; i += 1) {
    addBookToPage(library.books[i], i);
  }
}

function toggleReadStatus(e) {
  const card = e.target.parentElement;
  const index = card.dataset.id;
  const book = library.books[index];

  book.changeReadStatus();

  updateBookList();
}

function addBookToPage(book, index) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.dataset.id = index;

  const title = propertyToPara(book, 'title');
  title.classList.add('book-title');
  const author = propertyToPara(book, 'author');
  const pages = propertyToPara(book, 'pages');
  const isReadBtn = document.createElement('button');

  if (book.isRead) {
    isReadBtn.textContent = 'Is Read';
    isReadBtn.classList.add('book-read');
  } else {
    isReadBtn.textContent = 'Not Read';
    isReadBtn.classList.add('book-not-read');
  }

  isReadBtn.addEventListener('click', toggleReadStatus);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', deleteBook);

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(isReadBtn);
  bookCard.appendChild(deleteBtn);

  main.appendChild(bookCard);
}

function closePopUp() {
  const popUp = document.querySelector('#pop-up');
  body.removeChild(popUp);
}

function stopPropagation(e) {
  e.stopPropagation();
}

// Book class and methods
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.changeReadStatus = function () {
  this.isRead = this.isRead !== true;
};

function createNewBook(e) {
  e.preventDefault();

  const title = e.target[0].value;
  const author = e.target[1].value;
  const pages = e.target[2].value;
  const read = e.target[3].checked;

  const book = new Book(title, author, pages, read);

  library.addBook(book);

  addBookToPage(book, library.books.length - 1);

  closePopUp();
}

function createPopUp() {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'pop-up';
  const form = document.createElement('form');

  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'title');
  titleLabel.textContent = 'Title';

  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.id = 'title';
  titleInput.required = true;

  const authorLabel = document.createElement('label');
  authorLabel.setAttribute('for', 'author');
  authorLabel.textContent = 'Author';

  const authorInput = document.createElement('input');
  authorInput.setAttribute('type', 'text');
  authorInput.id = 'author';
  authorInput.required = true;

  const pagesLabel = document.createElement('label');
  pagesLabel.setAttribute('for', 'pages');
  pagesLabel.textContent = 'Pages';

  const pagesInput = document.createElement('input');
  pagesInput.setAttribute('type', 'number');
  pagesInput.id = 'pages';
  pagesInput.required = true;

  const readDiv = document.createElement('div');

  const readLabel = document.createElement('label');
  readLabel.setAttribute('for', 'read');
  readLabel.textContent = 'Already Read?';

  const readInput = document.createElement('input');
  readInput.setAttribute('type', 'checkbox');
  readInput.id = 'read';

  const button = document.createElement('button');
  button.setAttribute('type', 'submit');
  button.textContent = 'Add';

  readDiv.appendChild(readLabel);
  readDiv.appendChild(readInput);

  form.appendChild(titleLabel);
  form.appendChild(titleInput);

  form.appendChild(authorLabel);
  form.appendChild(authorInput);

  form.appendChild(pagesLabel);
  form.appendChild(pagesInput);

  form.appendChild(readDiv);

  form.appendChild(button);

  popUpDiv.appendChild(form);

  popUpDiv.addEventListener('click', closePopUp);
  form.addEventListener('click', stopPropagation);
  form.addEventListener('submit', createNewBook);

  return popUpDiv;
}

function openPopup() {
  const popUp = createPopUp();
  body.appendChild(popUp);
}

// DOM events
addBtn.addEventListener('click', openPopup);

// Temp books
// for (let i = 1; i <= 10; i += 1) {
//   const book = new Book('100 Years of Solitude', 'Gabriel Garcia Marquez', 300, true);
//   library.addBook(book);
// }

// for (let i = 0; i < library.books.length; i += 1) {
//   addBookToPage(library.books[i], i);
// }
