const spinnerDisplayToggle = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
};
const searchResultsDisplayToggle = () => {
    document.getElementById("found-items").innerText = "";
    document.getElementById("search-result").textContent = "";
};
const errorMessageToggle = () => {
    document.getElementById("error-messages").innerText = "";
};
const errorMessage = message => {
    document.getElementById("error-messages").innerText = message;
};
spinnerDisplayToggle("none");
const searchBook = () => {
    const searchTextInput = document.getElementById("search-field");
    const searchText = searchTextInput.value;
    if (searchTextInput.value === "") {
        spinnerDisplayToggle("none");
        searchResultsDisplayToggle();
        errorMessage("Search field can not be empty!");
    }
    else {
        spinnerDisplayToggle("block");
        searchResultsDisplayToggle();
        errorMessageToggle();
        loadJsonData(searchText);
    }
    searchTextInput.value = "";
};
const loadJsonData = async searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    if (jsonData.numFound === 0) {
        spinnerDisplayToggle("none");
        searchResultsDisplayToggle();
        errorMessage("No Results Found!!!");
    }
    else {
        displayFoundItemsQuantity(jsonData.numFound); // itemsCount -> numFound
        displayRequiredBooks(jsonData.docs); // booksLists -> docs
    }
};
const displayFoundItemsQuantity = itemsCount => {
    const foundItems = document.getElementById("found-items");
    foundItems.innerText = `Books Found: ${itemsCount}`;
    spinnerDisplayToggle("none");
};
const displayRequiredBooks = books => {
    spinnerDisplayToggle("none");
    const searchResult = document.getElementById("search-result");
    books.forEach(book => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card h-100">
            <img height="300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">Title: ${book.title}</h4>
                <h5 class="card-title">Author: ${book.author_name ? book.author_name : "N/A"}</h5>
                <h5 class="card-title">Publisher: ${book.publisher ? book.publisher : "N/A"}</h5>
                <h6 class="card-title">First Published: ${book.first_publish_year ? book.first_publish_year : "N/A"}</h6>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
};