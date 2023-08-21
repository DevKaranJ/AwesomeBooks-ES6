import { variables } from './variables.js';

export class BookManager {
  constructor() {
    this.books = JSON.parse(localStorage.getItem(variables.booksKey)) || [];
    this.addForm = document.querySelector(variables.addFormSelector);
    this.titleInput = document.querySelector(variables.titleInputSelector);
    this.authorInput = document.querySelector(variables.authorInputSelector);
    this.bookList = document.querySelector(variables.bookListSelector);
    this.listContent = document.querySelector(variables.listContentSelector);
    this.addNewContent = document.querySelector(variables.addNewContentSelector);
    this.contactContent = document.querySelector(variables.contactContentSelector);

    this.addForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    window.onload = this.displayBooks.bind(this);

    document.querySelector(variables.item1Selector).addEventListener('click', () => {
      this.showContent(this.listContent);
    });
    document.querySelector(variables.item2Selector).addEventListener('click', () => {
      this.showContent(this.addNewContent);
    });
    document.querySelector(variables.item3Selector).addEventListener('click', () => {
      this.showContent(this.contactContent);
    });

    this.showAllContent();
  }

  // Handle form submission
  handleFormSubmit(e) {
    e.preventDefault();
    const title = this.titleInput.value;
    const author = this.authorInput.value;
    this.addBook(title, author);
    this.titleInput.value = '';
    this.authorInput.value = '';
  }

  // Function to add a book
  addBook(title, author) {
    if (title.trim() === '' || author.trim() === '') {
      return;
    }

    const newBook = {
      title,
      author,
    };

    this.books.push(newBook);
    localStorage.setItem(variables.booksKey, JSON.stringify(this.books));
    this.displayBooks();
  }

  // Function to remove a book
  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem(variables.booksKey, JSON.stringify(this.books));
    this.displayBooks();
  }

  // Function to display books
  displayBooks() {
    this.bookList.innerHTML = '';
    this.books.forEach((book, index) => {
      const li = document.createElement('li');
      li.textContent = `${book.title} By ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });

      li.appendChild(removeButton);
      this.bookList.appendChild(li);
    });
  }

  showAllContent() {
    this.listContent.style.display = 'block';
    this.addNewContent.style.display = 'block';
    this.contactContent.style.display = 'none';
  }

  showContent(contentSection) {
    this.hideAllContent();
    contentSection.style.display = 'block';
  }

  hideAllContent() {
    this.listContent.style.display = 'none';
    this.addNewContent.style.display = 'none';
    this.contactContent.style.display = 'none';
  }
}
