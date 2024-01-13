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
/*
function deleteRow(index) {
    let tableBody = document.getElementById("booksTable").getElementsByTagName('tbody')[0];

    // Remove the row at the specified index
    tableBody.deleteRow(index);
}
*/



function display(myLibrary) {
    let tableBody = document.getElementById("booksTable").getElementsByTagName('tbody')[0];

            // Clear existing table content
            tableBody.innerHTML = "";
            let length = myLibrary.length;

            // Loop through the array and add rows to the table
            myLibrary.forEach((book,index) => {
                let row = tableBody.insertRow();
                if(myLibrary[index] !== 1) {

                    //let row = tableBody.insertRow();
                    let cellTitle = row.insertCell(0);
                    let cellAuthor = row.insertCell(1);
                    let cellPages = row.insertCell(2);
                    let cellRead = row.insertCell(3);
                    let cellButton = row.insertCell(4);

                    const btn = document.createElement('button');
                    btn.textContent = 'Remove';
                    btn.setAttribute("data-index", index);

                    const button = document.createElement('button');
                   // button.textContent = 'Read?';
                    //button.classList.add("grey");
                    if(book.read) {
                        button.classList.add("green");
                        button.textContent = 'YES';
                    }

                    if(!book.read) {
                        button.classList.add("red");
                        button.textContent = 'NO';
                    }

                    button.onclick = function() {
                        button.classList.remove("grey");
                        if (button.classList.contains("green")) {
                            button.classList.remove("green");    
                            button.classList.add("red");
                            button.textContent = 'NO';
                        } else {
                            button.classList.remove("red"); 
                            button.classList.add("green");
                            button.textContent = 'YES';
                        }
                    }

                    cellTitle.textContent = book.title;
                    cellAuthor.textContent = book.author;
                    cellPages.textContent = book.pages;
                    //cellRead.textContent = book.read;

                    btn.onclick = function() {
                        let rowIndex = parseInt(btn.getAttribute("data-index"));
                        //myLibrary.splice(rowIndex, 1);
                        myLibrary[rowIndex] = 1;
                        tableBody.deleteRow(rowIndex);
                        tableBody.insertRow(rowIndex);
                    }
                    cellButton.appendChild(btn);
                    cellRead.appendChild(button);
                }
            });
}

// some testing
/*
const book1 = new Book('POPO', 'Hamza', '28', 'not read');
const book2 = new Book('Trees', 'KOKO', '288', 'read');
const book3 = new Book('Night', 'Yassin', '2338', 'not read');

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

display(myLibrary);
*/

const dialog = document.querySelector("[data-modal]")
const openButton = document.querySelector(".open");
const closeButton = document.querySelector(".close");

const cleanInput = document.querySelectorAll('[title], [author], [number], [checkbox]');

const title = document.querySelector('[title]');
const author = document.querySelector('[author]');
const number = document.querySelector('[number]');
let checkbox = document.getElementById("myCheckbox");

function addToLibrary(title, author, number, checkbox) {
    const book = new Book(title.value, author.value, number.value, checkbox.checked);
    addBookToLibrary(book);
    display(myLibrary);
}

//addToLibrary(title, author, number, read);

openButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", (e) => {
    e.preventDefault();

    addToLibrary(title, author, number, checkbox);

    cleanInput.forEach( input => {
         input.value = '';
    });

    checkbox.checked = false;

    dialog.close();
});



