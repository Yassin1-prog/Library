function loadLibraryFromLocalStorage() {
  const myLibrary = [];
  for (let i = 0; i < localStorage.length; i++) {
    const look = localStorage.key(i);
    const looker = localStorage.getItem(look);
    /*const book = JSON.parse(looker).map(
      ({ title, author, number, checkbox }) =>
        new Book(title, author, number, checkbox)
    );*/
    //console.log(JSON.parse(looker));
    const book = JSON.parse(looker);
    myLibrary.push(book);
  }
  return myLibrary;
}

//const myLibrary = [];
const myLibrary = loadLibraryFromLocalStorage();
display(myLibrary);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    let report = "${title} by ${author}, ${pages} pages, ${read}";
    console.log(report);
  };
}

function addBookToLibrary(Book) {
  myLibrary.push(Book);
}

function display(myLibrary) {
  let tableBody = document
    .getElementById("booksTable")
    .getElementsByTagName("tbody")[0];

  // Clear existing table content
  tableBody.innerHTML = "";
  let length = myLibrary.length;

  // Loop through the array and add rows to the table
  myLibrary.forEach((book, index) => {
    let row = tableBody.insertRow();
    if (myLibrary[index] !== 1) {
      //let row = tableBody.insertRow();
      let cellTitle = row.insertCell(0);
      let cellAuthor = row.insertCell(1);
      let cellPages = row.insertCell(2);
      let cellRead = row.insertCell(3);
      let cellButton = row.insertCell(4);

      const btn = document.createElement("button");
      btn.textContent = "Remove";
      btn.setAttribute("data-index", index);

      const button = document.createElement("button");
      button.setAttribute("trace", index);

      if (book.read) {
        button.classList.add("green");
        button.textContent = "YES";
      }

      if (!book.read) {
        button.classList.add("red");
        button.textContent = "NO";
      }

      button.onclick = function () {
        button.classList.remove("grey");
        let traceIndex = parseInt(button.getAttribute("trace"));
        if (button.classList.contains("green")) {
          button.classList.remove("green");
          button.classList.add("red");
          button.textContent = "NO";
          myLibrary[traceIndex].read = false;
          sychronizeStorage();
        } else {
          button.classList.remove("red");
          button.classList.add("green");
          button.textContent = "YES";
          myLibrary[traceIndex].read = true;
          sychronizeStorage();
        }
      };

      cellTitle.textContent = book.title;
      cellAuthor.textContent = book.author == "" ? "-" : book.author;
      cellPages.textContent = book.pages == "" ? "-" : book.pages;

      btn.onclick = function () {
        let rowIndex = parseInt(btn.getAttribute("data-index"));
        localStorage.removeItem(myLibrary[rowIndex].title);
        myLibrary[rowIndex] = 1;
        tableBody.deleteRow(rowIndex);
        tableBody.insertRow(rowIndex);
      };
      cellButton.appendChild(btn);
      cellRead.appendChild(button);
    }
  });
}

const dialog = document.querySelector("[data-modal]");
const openButton = document.querySelector(".open");
const closeButton = document.querySelector(".close");
const terminate = document.querySelector(".finish");

const cleanInput = document.querySelectorAll(
  "[title], [author], [number], [checkbox]"
);

const title = document.querySelector("[title]");
const author = document.querySelector("[author]");
const number = document.querySelector("[number]");
let checkbox = document.getElementById("myCheckbox");

function addToLibrary(title, author, number, checkbox) {
  const book = new Book(
    title.value,
    author.value,
    number.value,
    checkbox.checked
  );
  addBookToLibrary(book);
  localStorage.setItem(title.value, JSON.stringify(book));
  //console.log(title.value);
  //console.log(localStorage.getItem(localStorage.key(0)));
  display(myLibrary);
}

function sychronizeStorage() {
  localStorage.clear();
  for (let i = 0; i < myLibrary.length; i++) {
    localStorage.setItem(myLibrary[i].title, JSON.stringify(myLibrary[i]));
  }
}

//addToLibrary(title, author, number, read);
const TITLE = document.querySelector("#title");
const NUMBER = document.querySelector("#number");
const titleError = document.querySelector("#title + span.error");
const numberError = document.querySelector("#number + span.err");

TITLE.addEventListener("input", (e) => {
  if (TITLE.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error";
  } else {
    titleError.textContent = "Title is required";
    titleError.className = "error active";
  }
});

NUMBER.addEventListener("input", () => {
  if (NUMBER.validity.valid) {
    numberError.textContent = "";
    numberError.className = "error";
  } else {
    numberError.textContent = "10000 pages at most";
    numberError.className = "error active";
  }
});

openButton.addEventListener("click", () => {
  dialog.show();
});

closeButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (TITLE.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error";
  } else {
    titleError.textContent = "Title is required";
    titleError.className = "error active";
    return;
  }

  if (NUMBER.validity.valid) {
    numberError.textContent = "";
    numberError.className = "error";
  } else {
    numberError.textContent = "10000 pages at most";
    numberError.className = "error active";
    return;
  }

  addToLibrary(title, author, number, checkbox);

  cleanInput.forEach((input) => {
    input.value = "";
  });

  checkbox.checked = false;

  dialog.close();
});

terminate.addEventListener("click", (e) => {
  e.preventDefault();

  cleanInput.forEach((input) => {
    input.value = "";
  });

  checkbox.checked = false;

  dialog.close();
});
