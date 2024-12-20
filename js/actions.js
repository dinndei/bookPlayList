//מקבל ספר ומציג אותו בצד בכרטיס בצורה דינמית 
export const bookDisplay = () => {
    let book = JSON.parse(localStorage.getItem("dispBook"));

    let container = document.getElementById("container");
    let oldBookDisplay = document.getElementById("display-wrapper");
    if (oldBookDisplay) {
        oldBookDisplay.remove();
    }
    // יצירת כרטיס הספר

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

    let imageCell = document.createElement("td");
    let img = document.createElement("img");
    img.setAttribute("src", book.image); // URL to image
    img.setAttribute("alt", book.title);
    img.setAttribute("class", "book-image");
    imageCell.appendChild(img);
    wrapper.appendChild(imageCell);


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
    decRateBtn.addEventListener("click", decRate);

    rateDiv.appendChild(decRateBtn);

    let rate = document.createElement("h4");
    rate.innerText = book.rate;
    rate.setAttribute("id", "rate-content");
    rateDiv.appendChild(rate);

    let incRateBtn = document.createElement("button");
    incRateBtn.innerText = "+";
    incRateBtn.setAttribute("class", "rate-btn");
    incRateBtn.setAttribute("id", "inc-rate-btn");
    incRateBtn.addEventListener("click", incRate);

    rateDiv.appendChild(incRateBtn);
    wrapper.appendChild(rateDiv);
    container.appendChild(wrapper);

}
// מגדיל את הדירוג ב1
export const incRate = () => {
    let book = JSON.parse(localStorage.getItem("dispBook"));
    let bookArr = JSON.parse(localStorage.getItem("books"));

    let updatedBookArr = bookArr.map(item => {
        if (item.id == book.id && item.rate < 10) {
            return { ...item, rate: item.rate + 1 };
        }
        return item;
    });

    // Save updated book array to localStorage
    localStorage.setItem("books", JSON.stringify(updatedBookArr));

    // Find the updated book and display it
    let updatedBook = updatedBookArr.find(item => item.id == book.id);
    localStorage.setItem("dispBook", JSON.stringify(updatedBook));

    // Update the displayed rate
    let rate = document.getElementById("rate-content");
    rate.innerText = updatedBook.rate;
};

// מקטין את הדירוג ב1
export const decRate = () => {
    let book = JSON.parse(localStorage.getItem("dispBook"));
    let bookArr = JSON.parse(localStorage.getItem("books"));

    let updatedBookArr = bookArr.map(item => {
        if (item.id == book.id && item.rate > 0) {
            return { ...item, rate: item.rate - 1 };
        }
        return item;
    });

    // Save updated book array to localStorage
    localStorage.setItem("books", JSON.stringify(updatedBookArr));

    // Find the updated book and display it
    let updatedBook = updatedBookArr.find(item => item.id == book.id);
    localStorage.setItem("dispBook", JSON.stringify(updatedBook));

    // Update the displayed rate
    let rate = document.getElementById("rate-content");
    rate.innerText = updatedBook.rate;
};

//תצוגת ספר כולל אפשרות עריכה
export const bookDisplayForUpdate = () => {
    let book = JSON.parse(localStorage.getItem("dispBook"));
    console.log("in function");
    let container = document.getElementById("container");
    let oldBookDisplay = document.getElementById("display-wrapper");
    if (oldBookDisplay) {
        oldBookDisplay.remove();


    }

    let wrapper = document.createElement("div");
    wrapper.setAttribute("id", "display-wrapper");
    // id לא ניתן לעדכון
    let id = document.createElement("h3");
    id.innerText = book.id;
    id.setAttribute("class", "display-id");
    wrapper.appendChild(id);

    // השדות המאופשרים לעדכון באינפוטים
    let title = document.createElement("input");
    title.setAttribute("type", "text");
    title.value = book.title;
    title.setAttribute("class", "display-title");
    title.setAttribute("class", "form-control");
    wrapper.appendChild(title);

    let author = document.createElement("input");
    author.setAttribute("type", "text");
    author.value = book.author;
    author.setAttribute("class", "display-author");
    title.setAttribute("class", "form-control");
    wrapper.appendChild(author);

    let price = document.createElement("input");
    price.setAttribute("type", "number");
    price.value = book.price;
    price.setAttribute("class", "display-price");
    title.setAttribute("class", "form-control");
    wrapper.appendChild(price);

    let rateDiv = document.createElement("div");
    rateDiv.setAttribute("class", "rate-wrap");

    let decRateBtn = document.createElement("button");
    decRateBtn.innerText = "-";
    decRateBtn.setAttribute("class", "rate-btn");
    decRateBtn.setAttribute("id", "dec-rate-btn");
    decRateBtn.addEventListener("click", decRate);

    rateDiv.appendChild(decRateBtn);

    let rate = document.createElement("h4");
    rate.innerText = book.rate;
    rate.setAttribute("id", "rate-content");
    rateDiv.appendChild(rate);

    let incRateBtn = document.createElement("button");
    incRateBtn.innerText = "+";
    incRateBtn.setAttribute("class", "rate-btn");
    incRateBtn.setAttribute("id", "inc-rate-btn");
    incRateBtn.addEventListener("click", incRate);

    rateDiv.appendChild(incRateBtn);

    wrapper.appendChild(rateDiv);

    //כפתור לשמירת השינויים
    let saveBtn = document.createElement("button");
    saveBtn.innerText = "Save changes";
    saveBtn.setAttribute("id", "save-btn");
    saveBtn.setAttribute("class", "btn");
    wrapper.appendChild(saveBtn);

    container.appendChild(wrapper);

    //אירוע לשמירת שינויים
    saveBtn.addEventListener("click", () => {

        book.title = title.value;
        book.author = author.value;
        book.price = parseFloat(price.value);

        // קבלת המידע מהלוקל סטורג
        let bookArr = JSON.parse(localStorage.getItem("books"));
        let item = bookArr.find(item => item.id == book.id);

        if (item) {
            // ממזג את המידע החדש לתוך האובייקט
            Object.assign(item, { title: book.title, author: book.author, price: book.price });
        }

        // שמירת השיוניים בלוקל סטורג
        localStorage.setItem("books", JSON.stringify(bookArr));
        localStorage.setItem("dispBook", JSON.stringify(item));
        alert("Book details updated!");
        window.location.reload()
    });
}

//פונקציה שיוצרת דיאלוג של טופס הוספת ספר חדש
export const openAddBookDialog = () => {
    let dialog = document.createElement("dialog");
    dialog.setAttribute("id", "add-book-dialog");

    // Create close button (X)
    let closeBtn = document.createElement("button");
    closeBtn.innerText = "×"; // The "X" symbol
    closeBtn.setAttribute("id", "close-btn");
    closeBtn.addEventListener("click", () => {
        dialog.close(); // Close the dialog when "X" is clicked
        dialog.remove(); // Remove dialog from the DOM after closing
    });

    let form = document.createElement("form");
    form.setAttribute("method", "dialog");
    form.setAttribute("id", "add-book-form");

    dialog.appendChild(closeBtn);

    // Title input
    let titleLabel = document.createElement("label");
    titleLabel.innerText = "Book Title:";
    let titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "book-title");
    titleInput.setAttribute("required", "true");
    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    // Author input
    let authorLabel = document.createElement("label");
    authorLabel.innerText = "Author:";
    let authorInput = document.createElement("input");
    authorInput.setAttribute("type", "text");
    authorInput.setAttribute("id", "book-author");
    authorInput.setAttribute("required", "true");
    form.appendChild(authorLabel);
    form.appendChild(authorInput);
    // Price input
    let priceLabel = document.createElement("label");
    priceLabel.innerText = "Price (₪):";
    let priceInput = document.createElement("input");
    priceInput.setAttribute("type", "number");
    priceInput.setAttribute("id", "book-price");
    priceInput.setAttribute("required", "true");
    form.appendChild(priceLabel);
    form.appendChild(priceInput);
    // Rate input
    let rateLabel = document.createElement("label");
    rateLabel.innerText = "Rate (1-10):";
    let rateInput = document.createElement("input");
    rateInput.setAttribute("type", "number");
    rateInput.setAttribute("id", "book-rate");
    rateInput.setAttribute("min", "1");
    rateInput.setAttribute("max", "10");
    rateInput.setAttribute("required", "true");
    form.appendChild(rateLabel);
    form.appendChild(rateInput);
    // Image input (file upload)
    let imgLabel = document.createElement("label");
    imgLabel.innerText = "Upload Book Image:";
    let imgInput = document.createElement("input");
    imgInput.setAttribute("type", "file");
    imgInput.setAttribute("id", "book-img");
    imgInput.setAttribute("accept", "image/*");
    form.appendChild(imgLabel);
    form.appendChild(imgInput);
    // Submit button
    let submitBtn = document.createElement("button");
    submitBtn.innerText = "Add Book";
    submitBtn.setAttribute("type", "submit");
    form.appendChild(submitBtn);

    dialog.appendChild(form);
    document.body.appendChild(dialog);
    dialog.showModal();

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // קריאת ערכי הטופס
        const title = document.getElementById("book-title").value;
        const author = document.getElementById("book-author").value;
        const price = parseFloat(document.getElementById("book-price").value);
        const rate = parseInt(document.getElementById("book-rate").value);
        const imgFile = document.getElementById("book-img").files[0];

        // פונקציה להוספת הספר החדש
        const addBook = (imgBase64 = null) => {
            let bookArr = JSON.parse(localStorage.getItem("books")) || [];
            // יצירת אובייקט ספר חדש
            let maxId = Math.max(...bookArr.map(book => book.id));
            let newBook = {
                id: maxId + 1, // מזהה ספר חדש
                title: title,
                author: author,
                price: price,
                rate: rate,
                img: imgBase64, // תמונה כ-Base64 אם קיימת
            };
            bookArr.push(newBook);
            localStorage.setItem("books", JSON.stringify(bookArr));
            dialog.close();
            form.reset();
            alert("Book added successfully!");
            window.location.reload();
        };

        // קריאת הקובץ אם קיים, אחרת קריאה להוספת הספר ללא תמונה
        if (imgFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const imgBase64 = reader.result;
                addBook(imgBase64);
            };
            reader.readAsDataURL(imgFile);
        } else {
            addBook(); // הוספה ללא תמונה
        }
    });


}

//פונקציות למיון הטבלה, כל פונקציה ע"פ ערך מסוים
//מיון עולה ע"פ שם ספר
export const sortAscTitle = () => {
    let bookArr = JSON.parse(localStorage.getItem("books"));
    bookArr.sort((a, b) => a.title.localeCompare(b.title));
    localStorage.setItem("books", JSON.stringify(bookArr));
    //יצירת אירוע של עדכון local storage
    const event = new Event('localStorageUpdated');
    window.dispatchEvent(event);
}
//מיון יורד ע"פ שם ספר
export const sortDescTitle = () => {
    let bookArr = JSON.parse(localStorage.getItem("books"));
    bookArr.sort((a, b) => b.title.localeCompare(a.title));
    localStorage.setItem("books", JSON.stringify(bookArr));
    //יצירת אירוע של עדכון local storage
    const event = new Event('localStorageUpdated');
    window.dispatchEvent(event);
}
//מיון עולה ע"פ מחיר
export const sortAscPrice = () => {
    let bookArr = JSON.parse(localStorage.getItem("books"));
    bookArr.sort((a, b) => a.price - b.price);
    localStorage.setItem("books", JSON.stringify(bookArr));
    //יצירת אירוע של עדכון local storage
    const event = new Event('localStorageUpdated');
    window.dispatchEvent(event);
}
//מיון יורד ע"פ מחיר
export const sortDescPrice = () => {
    let bookArr = JSON.parse(localStorage.getItem("books"));
    bookArr.sort((a, b) => b.price - a.price);
    localStorage.setItem("books", JSON.stringify(bookArr));
    //יצירת אירוע של עדכון local storage
    const event = new Event('localStorageUpdated');
    window.dispatchEvent(event);
}

//הוספת אירועי לחיצה לכפתורי המיון וקריאה לפונקציית המיון בעת הלחיצה
let btnSortAscPrice = document.getElementById("sort-asc");
btnSortAscPrice.addEventListener("click", sortAscPrice);
let btnSortDescPrice = document.getElementById("sort-desc");
btnSortDescPrice.addEventListener("click", sortDescPrice);
let btnSortAscString = document.getElementById("sort-asc-string");
btnSortAscString.addEventListener("click", sortAscTitle);
let btnSortDescString = document.getElementById("sort-desc-string");
btnSortDescString.addEventListener("click", sortDescTitle);

//הוספת האזנה לעדכון הלוקל סטורג וטעינה מחדש של הדף בעת העדכון
window.addEventListener('localStorageUpdated', () => {
    window.location.reload();
});
