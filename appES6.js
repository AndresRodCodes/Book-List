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
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove();
		}
	}
}

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
	// Instantiate UI object
	const ui = new UI();
	// Delete book
	ui.deleteBook(e.target);
	// Show alert
	ui.showAlert('Book Removed', 'success');

	e.preventDefault();
});
