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

function addBookToPage(book) {
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

  main.appendChild(bookCard);
}

function closePopUp() {
  const popUp = document.querySelector('#pop-up');
  body.removeChild(popUp);
}

function stopPropagation(e) {
  e.stopPropagation();
}

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

// Library instatiated

const library = new Library();

function createNewBook(e) {
  e.preventDefault();

  const title = e.target[0].value;
  const author = e.target[1].value;
  const pages = e.target[2].value;
  const read = (e.target[3].value === 'on');

  const book = new Book(title, author, pages, read);

  library.addBook(book);

  addBookToPage(book);

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

  const authorLabel = document.createElement('label');
  authorLabel.setAttribute('for', 'author');
  authorLabel.textContent = 'Author';

  const authorInput = document.createElement('input');
  authorInput.setAttribute('type', 'text');
  authorInput.id = 'author';

  const pagesLabel = document.createElement('label');
  pagesLabel.setAttribute('for', 'pages');
  pagesLabel.textContent = 'Pages';

  const pagesInput = document.createElement('input');
  pagesInput.setAttribute('type', 'number');
  pagesInput.id = 'pages';

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
for (let i = 1; i <= 10; i += 1) {
  const book = new Book('100 Years of Solitude', 'Gabriel Garcia Marquez', 300, true);
  library.addBook(book);
}

library.books.forEach((book) => addBookToPage(book));
