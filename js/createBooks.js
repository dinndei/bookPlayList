
import jsonBooks from "../data/books.json" with {type: "json"};
let bookArr = JSON.parse(localStorage.getItem("books"));
if(!bookArr||bookArr==[]){
bookArr = jsonBooks["books"];
localStorage.setItem("books", JSON.stringify(bookArr));
}

//מקבל רשימת ספרים ומציג אותה בצורה דינמית 

const createBookList = () => {

  let bookArr = JSON.parse(localStorage.getItem("books"));
  if(!bookArr||bookArr==[]){
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
    readBtn.addEventListener("click",()=>{
      localStorage.setItem("dispBook", JSON.stringify(bookArr[i]));
      bookDisplay()
    })
    tr.appendChild(readBtn);

    let updateBtn = document.createElement("td");
    updateBtn.innerText = "update";
    updateBtn.setAttribute("class", "update-btn");
    updateBtn.setAttribute("id", bookArr[i].id);
    updateBtn.addEventListener("click", () => {
      updateBook(bookArr[i].id);
      tr.remove();
    })
    tr.appendChild(updateBtn);

    let deleteBtn = document.createElement("td");
    deleteBtn.innerText = "delete";
    deleteBtn.setAttribute("class", "delete-btn");
    deleteBtn.setAttribute("id", bookArr[i].id);
    deleteBtn.addEventListener("click", () => {
      deleteBook(bookArr[i].id);
      tr.remove();
    })
    tr.appendChild(deleteBtn);

    table.appendChild(tr);

  }
}
window.addEventListener("load", createBookList)
// אירועי לחיצה על פעולות
//יציגו את הפונקציה הבאה:


//מקבל ספר ומציג בצורה דינמית 
const bookDisplay = () => {
let book= JSON.parse(localStorage.getItem("dispBook"));

  let body = document.getElementById("body");
  let oldBookDisplay=document.getElementById("display-wrapper");
  if(oldBookDisplay){
  oldBookDisplay.remove();
  }
  // יצירת כרטיס ספר

  let wrapper = document.createElement("div");
  wrapper.setAttribute("id", "display-wrapper");

  let id = document.createElement("h3");
  id.innerText = book.id;
  id.setAttribute("class", "display-id");
  wrapper.appendChild(id);

  let title = document.createElement("h3");
  title.innerText = book.title;
  title.setAttribute("class", "display-title");
  wrapper.appendChild(title);

  let author = document.createElement("h4");
  author.innerText = book.author;
  author.setAttribute("class", "display-author");
  wrapper.appendChild(author);

  let price = document.createElement("h4");
  price.innerText = book.price + " ₪";
  price.setAttribute("class", "display-price");
  wrapper.appendChild(price);

  let rateDiv = document.createElement("div");
  rateDiv.setAttribute("class", "rate-wrap")
  let decRateBtn = document.createElement("button");
  decRateBtn.innerText = "-";
  decRateBtn.setAttribute("class", "rate-btn");
  decRateBtn.setAttribute("id", "dec-rate-btn");
  rateDiv.appendChild(decRateBtn);

  let rate = document.createElement("h4");
  price.innerText = book.rate;
  price.setAttribute("id", "rate-content");
  rateDiv.appendChild(rate);

  let incRateBtn = document.createElement("button");
  incRateBtn.innerText = "+";
  incRateBtn.setAttribute("class", "rate-btn");
  incRateBtn.setAttribute("id", "inc-rate-btn");
  rateDiv.appendChild(incRateBtn);

  wrapper.appendChild(rateDiv);

  body.appendChild(wrapper);

}

window.addEventListener("load", ()=>{
 let item=JSON.parse(localStorage.getItem("dispBook"));
if(item){
  bookDisplay();
}
});


//פונקציות להפעלה בעת אירוע

//הוספת ספר למערך

//מחיקת ספר ממערך
const deleteBook = (bookId) => {
  bookArr = JSON.parse(localStorage.getItem("books"));
  let newBookArr = bookArr.filter(item => item.id != bookId);
  localStorage.setItem("books", JSON.stringify(newBookArr));

}
//עריכת ספר במערך
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
//העלאת דירוג
let incBtn = document.getElementById("inc-rate-btn");
const incRate = () => {
  let book = JSON.parse(localStorage.getItem("dispBook"));
  let bookArr = JSON.parse(localStorage.getItem("books"));

  let item = bookArr.find(item => item.id == book.id);
  if (item&&item.rate<10) {
    //ממזג שינויים בתוך אובייקט
    Object.assign(item, { rate: book.rate + 1 });
  }

  localStorage.setItem("dispBook", JSON.stringify(item));
  localStorage.setItem("books", JSON.stringify(bookArr));
  let rate = document.getElementById("rate-content");
  rate.innerText = item.rate;
}
incBtn.addEventListener("click", incRate)
//הורדת דירוג

let decBtn = document.getElementById("dec-rate-btn");
const decRate = () => {
  let book = JSON.parse(localStorage.getItem("dispBook"));
  let bookArr = JSON.parse(localStorage.getItem("books"));

  let item = bookArr.find(item => item.id == book.id);
  if (item&&item.rate > 0) {
    //ממזג שינויים בתוך אובייקט
      Object.assign(item, { rate: book.rate - 1 });
    
  }

  localStorage.setItem("dispBook", JSON.stringify(item));
  localStorage.setItem("books", JSON.stringify(bookArr));
  let rate = document.getElementById("rate-content");
  rate.innerText = item.rate;
}
decBtn.addEventListener("click", decRate)









//לייצור אירוע של טריגר של הלוקלסטורג
function setItemWithEvent(key, value) {
  localStorage.setItem(key, value);
  // Dispatch a custom event when localStorage is updated
  const event = new Event('localStorageUpdated');
  window.dispatchEvent(event);
}

// Listener for custom localStorage change event
window.addEventListener('localStorageUpdated', function () {
  console.log('localStorage was updated in the same tab!');
});

// Example usage
setItemWithEvent('exampleKey', 'exampleValue');


