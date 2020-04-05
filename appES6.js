// BOOK CONSTRUCTOR
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// UI CONSTRUCTOR
class UI {
	constructor() {}
	addBookToList(book) {
		const bookList = document.querySelector('#book-list');
		const row = document.createElement('tr');
		const col = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
            `;
		row.innerHTML = col;
		bookList.appendChild(row);
	}
	clearFields() {
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}
	showAlert(msg, className) {
		// Create div
		const alertDiv = document.createElement('div');
		// Insert attribute
		alertDiv.className = `alert ${className}`;
		// Insert message
		alertDiv.appendChild(document.createTextNode(msg));
		// Get parent
		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		// Insert alert
		container.insertBefore(alertDiv, form);
		// Remove alertDiv
		setTimeout(function() {
			alertDiv.remove();
		}, 3000);
	}
	deleteBook(target) {
		// Check for delete class
		if (target.className === 'delete') {
			// Remove table row element
			target.parentElement.parentElement.remove();
		}
	}
}

class Storage {
	constructor() {}
	static loadBooks() {
		let books;
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}

		return books;
	}

	static displayBooks() {
		// Get books from local storage.
		const books = Storage.loadBooks();

		// Add each book to the list
		books.forEach(function(book) {
			// Instantiate UI object
			const ui = new UI();
			ui.addBookToList(book);
		});
	}

	static saveBook(book) {
		// Get books
		const books = Storage.loadBooks();
		// Add new book
		books.push(book);
		// Save to local storage
		localStorage.setItem('books', JSON.stringify(books));
	}

	static deleteBook(isbn) {
		// Get books
		const books = Storage.loadBooks();
		// Loop through books
		books.forEach(function(book, index) {
			if (book.isbn === isbn) {
				// Remove book from local storage
				books.splice(index, 1);
			}
			// Set updated LS
			localStorage.setItem('books', JSON.stringify(books));
		});
	}
}

// ON DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', Storage.displayBooks());

// EVENT LISTENERS
// On book submit
document.querySelector('#book-form').addEventListener('submit', function(e) {
	// Get form values
	const UITitle = document.querySelector('#title').value,
		UIAuthor = document.querySelector('#author').value,
		UIisbn = document.querySelector('#isbn').value;
	// Instantiate UI object
	const ui = new UI();

	// Validate form
	if (UITitle === '' || UIAuthor === '' || UIisbn === '') {
		// INVALID FORM
		// Display error message
		ui.showAlert('Please fill all fields', 'error');
	} else {
		//VALID FORM
		// Instantiate Book object
		const book = new Book(UITitle, UIAuthor, UIisbn);
		// Save book to local storage
		Storage.saveBook(book);
		// Add book to list with form values
		ui.addBookToList(book);
		// Clear UI field
		ui.clearFields();
		// User confirmation
		ui.showAlert('Book Added!', 'success');
	}

	e.preventDefault();
});

// On remove book
document.querySelector('#book-list').addEventListener('click', function(e) {
	// Remove from local storage
	Storage.deleteBook(e.target.parentElement.previousElementSibling.textContent);
	// Instantiate UI object
	const ui = new UI();
	// Delete book
	ui.deleteBook(e.target);
	// Show alert
	ui.showAlert('Book Removed', 'success');

	e.preventDefault();
});
