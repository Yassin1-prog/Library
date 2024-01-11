const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let report = '${title} by ${author}, ${pages} pages, ${read}';
        console.log(report);
    };
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);

}

function display(myLibrary) {
    let tableBody = document.getElementById("booksTable").getElementsByTagName('tbody')[0];

            // Clear existing table content
            tableBody.innerHTML = "";

            // Loop through the array and add rows to the table
            myLibrary.forEach(book => {
                let row = tableBody.insertRow();
                let cellTitle = row.insertCell(0);
                let cellAuthor = row.insertCell(1);
                let cellPages = row.insertCell(2);
                let cellRead = row.insertCell(3);

                cellTitle.textContent = book.title;
                cellAuthor.textContent = book.author;
                cellPages.textContent = book.pages;
                cellRead.textContent = book.read;
            });
}

// some testing
const book1 = new Book('POPO', 'Hamza', '28', 'not read');
const book2 = new Book('Trees', 'KOKO', '288', 'read');
const book3 = new Book('Night', 'Yassin', '2338', 'not read');

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

display(myLibrary);