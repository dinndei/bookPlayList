//מקבל ספר ומציג בצורה דינמית 
export const bookDisplay = () => {
    let book = JSON.parse(localStorage.getItem("dispBook"));

    let body = document.getElementById("body");
    let oldBookDisplay = document.getElementById("display-wrapper");
    if (oldBookDisplay) {
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
    decBtn.addEventListener("click", decRate);

    rateDiv.appendChild(decRateBtn);

    let rate = document.createElement("h4");
    price.innerText = book.rate;
    price.setAttribute("id", "rate-content");
    rateDiv.appendChild(rate);

    let incRateBtn = document.createElement("button");
    incRateBtn.innerText = "+";
    incRateBtn.setAttribute("class", "rate-btn");
    incRateBtn.setAttribute("id", "inc-rate-btn");
    incBtn.addEventListener("click", incRate);

    rateDiv.appendChild(incRateBtn);

    


    wrapper.appendChild(rateDiv);

    body.appendChild(wrapper);

}





//העלאת דירוג

export const incRate = () => {
    let book = JSON.parse(localStorage.getItem("dispBook"));
    let bookArr = JSON.parse(localStorage.getItem("books"));

    let item = bookArr.find(item => item.id == book.id);
    if (item && item.rate < 10) {
        //ממזג שינויים בתוך אובייקט
        Object.assign(item, { rate: book.rate + 1 });
    }

    localStorage.setItem("dispBook", JSON.stringify(item));
    localStorage.setItem("books", JSON.stringify(bookArr));
    let rate = document.getElementById("rate-content");
    rate.innerText = item.rate;
}

//הורדת דירוג


export const decRate = () => {
    let book = JSON.parse(localStorage.getItem("dispBook"));
    let bookArr = JSON.parse(localStorage.getItem("books"));

    let item = bookArr.find(item => item.id == book.id);
    if (item && item.rate > 0) {
        //ממזג שינויים בתוך אובייקט
        Object.assign(item, { rate: book.rate - 1 });

    }

    localStorage.setItem("dispBook", JSON.stringify(item));
    localStorage.setItem("books", JSON.stringify(bookArr));
    let rate = document.getElementById("rate-content");
    rate.innerText = item.rate;
}





//תצוגת ספר כולל אפשרות עריכה
export const bookDisplayForUpdate = () => {
    let book = JSON.parse(localStorage.getItem("dispBook"));
    console.log("in function");
    let body = document.getElementById("body");
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
    wrapper.appendChild(title);

    let author = document.createElement("input");
    author.setAttribute("type", "text");
    author.value = book.author;
    author.setAttribute("class", "display-author");
    wrapper.appendChild(author);

    let price = document.createElement("input");
    price.setAttribute("type", "number");
    price.value = book.price;
    price.setAttribute("class", "display-price");
    wrapper.appendChild(price);

    let rateDiv = document.createElement("div");
    rateDiv.setAttribute("class", "rate-wrap");

    let decRateBtn = document.createElement("button");
    decRateBtn.innerText = "-";
    decRateBtn.setAttribute("class", "rate-btn");
    decRateBtn.setAttribute("id", "dec-rate-btn");
    rateDiv.appendChild(decRateBtn);

    let rate = document.createElement("h4");
    rate.innerText = book.rate;
    rate.setAttribute("id", "rate-content");
    rateDiv.appendChild(rate);

    let incRateBtn = document.createElement("button");
    incRateBtn.innerText = "+";
    incRateBtn.setAttribute("class", "rate-btn");
    incRateBtn.setAttribute("id", "inc-rate-btn");
    rateDiv.appendChild(incRateBtn);

    wrapper.appendChild(rateDiv);

    //כפתור לשמירת השינויים
    let saveBtn = document.createElement("button");
    saveBtn.innerText = "Save changes";
    saveBtn.setAttribute("id", "save-btn");
    saveBtn.setAttribute("class", "btn");
    wrapper.appendChild(saveBtn);

    body.appendChild(wrapper);

    // Add events for increment/decrement of rate
    incRateBtn.addEventListener("click", incRate);
    decRateBtn.addEventListener("click", decRate);

    // Add event for saving changes
    saveBtn.addEventListener("click", () => {
        // Update book details
        book.title = title.value;
        book.author = author.value;
        book.price = parseFloat(price.value); // Convert price input to a number

        // Update book in localStorage
        let bookArr = JSON.parse(localStorage.getItem("books"));
        let item = bookArr.find(item => item.id == book.id);

        if (item) {
            // Merge the updated book data into the original book object
            Object.assign(item, { title: book.title, author: book.author, price: book.price });
        }

        // Save the updated book back to localStorage
        localStorage.setItem("books", JSON.stringify(bookArr));
        localStorage.setItem("dispBook", JSON.stringify(item));
        bookDisplay();
        alert("Book details updated!");
        window.location.reload
    });
}


