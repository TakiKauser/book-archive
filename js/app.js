// spinner display toggle function
const spinnerDisplayToggle = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
};
// search result display toggle function
const searchResultsDisplayToggle = () => {
    document.getElementById("found-items").innerText = "";
    document.getElementById("search-result").textContent = "";
};
// function to clear error message area
const errorMessageToggle = () => {
    document.getElementById("error-messages").innerText = "";
};
// display error message function
const errorMessage = message => {
    document.getElementById("error-messages").innerText = message;
};
// set spinner hidden initially 
spinnerDisplayToggle("none");
// onclick event handler function
document.getElementById("button-search").addEventListener("click", searchBook = () => {
    // get input text
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
    // clear input field
    searchTextInput.value = "";
});
const loadJsonData = async searchText => {
    // fetch json data from api
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
// function to display found items quantity
const displayFoundItemsQuantity = itemsCount => {
    const foundItems = document.getElementById("found-items");
    foundItems.innerText = `Books Found: ${itemsCount}`;
    spinnerDisplayToggle("none");
};
// function to display required search result
const displayRequiredBooks = books => {
    spinnerDisplayToggle("none");
    const searchResult = document.getElementById("search-result");
    books.forEach(book => {
        const div = document.createElement("div");
        div.classList.add("col", "shadow", "p-3", "border", "rounded");
        div.innerHTML = `
        <div class="card h-100">
            <img height="300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title"><span class="text-secondary">Title:</span> <span class="fw-bold">${book.title}</span></h4>
                <h5 class="card-title text-secondary">Author: <span class="fw-bold fst-italic">${book.author_name ? book.author_name[0] : "N/A"}</span></h5>
                <h5 class="card-title"><span class="text-secondary">Publisher:</span> ${book.publisher ? book.publisher[0] : "N/A"}</h5>
                <h6 class="card-title"><span class="text-secondary">First Published:</span> ${book.first_publish_year ? book.first_publish_year : "N/A"}</h6>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
};