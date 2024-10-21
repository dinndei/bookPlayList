import jsonBooks from "../data/books.json" with {type: "json"};
import { bookDisplay, bookDisplayForUpdate, openAddBookDialog } from "./actions.js";

//מקבל רשימת ספרים ומציג אותה בצורה דינמית 
const createBookList = () => {
  let bookArr = JSON.parse(localStorage.getItem("books"));

  if (!bookArr || bookArr == []) {
    bookArr = jsonBooks["books"];
    localStorage.setItem("books", JSON.stringify(bookArr));
  }

  let table = document.getElementById("table");
  console.log(bookArr);

  // יצירת כרטיסי ספר
  for (let i = 0; i < bookArr.length; i++) {

    let tr = document.createElement("tr");
    tr.setAttribute("class", "tr");

    let id = document.createElement("td");
    id.innerText = bookArr[i].id;
    id.setAttribute("class", "id");
    tr.appendChild(id);

    let title = document.createElement("td");
    title.innerText = bookArr[i].title;
    title.setAttribute("class", "title");
    tr.appendChild(title);

    let author = document.createElement("td");
    author.innerText = bookArr[i].author;
    author.setAttribute("class", "author");
    tr.appendChild(author);

    let price = document.createElement("td");
    price.innerText = bookArr[i].price + " ₪";
    price.setAttribute("class", "price");
    tr.appendChild(price);
    
    
    //actions
    let readBtn = document.createElement("td");
    readBtn.innerText = "Read";
    readBtn.setAttribute("class", "read-btn");
    readBtn.setAttribute("id", bookArr[i].id);
    readBtn.addEventListener("click", () => {
      let newBookArr = JSON.parse(localStorage.getItem("books"));
      if (newBookArr)
        bookArr = newBookArr;
      localStorage.setItem("dispBook", JSON.stringify(bookArr[i]));
      bookDisplay()
    })
    tr.appendChild(readBtn);

    let updateBtn = document.createElement("td");
    updateBtn.innerText = "update";
    updateBtn.setAttribute("class", "update-btn");
    updateBtn.setAttribute("id", bookArr[i].id);
    updateBtn.addEventListener("click", () => {
      localStorage.setItem("dispBook", JSON.stringify(bookArr[i]));
      bookDisplayForUpdate();

    })
    tr.appendChild(updateBtn);

    let deleteBtn = document.createElement("td");
    deleteBtn.innerText = "delete";
    deleteBtn.setAttribute("class", "delete-btn");
    deleteBtn.setAttribute("id", bookArr[i].id);
    deleteBtn.addEventListener("click", () => {
      deleteBook(bookArr[i].id);
      tr.remove();
      let dispBook = JSON.parse(localStorage.getItem("dispBook"));
      if (dispBook.id == bookArr[i].id) {
        localStorage.removeItem("dispBook")
        let display = document.getElementById("display-wrapper");
        display.remove();
      }
    })
    tr.appendChild(deleteBtn);

    table.appendChild(tr);

  }
}

//בעת טעינת הדף:
//הכנסת המערך מהלוקל סטורג או מקובץ הדאטה למשתנה
//קריאה לפונקציות ליצירת טבלת הספרים וכרטיס הספר המוצג
window.addEventListener("load", () => {
  let bookArr = JSON.parse(localStorage.getItem("books"));
  if (!bookArr || bookArr == []) {
    bookArr = jsonBooks["books"];
    localStorage.setItem("books", JSON.stringify(bookArr));
  }
  
  createBookList();
  let item = JSON.parse(localStorage.getItem("dispBook"));
  if (item) {
    bookDisplay();
  }
});

// אירועי לחיצה על פעולות

//אירוע הוספת ספר ע"ילחיצה על כפתור הוספת ספר
let addBookBtn = document.getElementById("add-book-btn")
addBookBtn.addEventListener("click", openAddBookDialog)


//פונקציה למחיקת ספר ממערך
const deleteBook = (bookId) => {
  bookArr = JSON.parse(localStorage.getItem("books"));
  let newBookArr = bookArr.filter(item => item.id != bookId);
  localStorage.setItem("books", JSON.stringify(newBookArr));

}
//פונקציה לעריכת ספר במערך
const updateBook = (bookId) => {
  bookArr = JSON.parse(localStorage.getItem("books"));
  let item = bookArr.find(item => item.id == bookId);

  if (item) {
    bookDisplay()
    //להוסיף אפשרות עריכה
    //ממזג שינויים בתוך אובייקט
    let newBookData = { title: "updated" }
    Object.assign(item, newBookData);
  }
  localStorage.setItem("books", JSON.stringify(bookArr));
}




