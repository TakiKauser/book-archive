const searchBook = () => {
    const searchText = document.getElementById("search-field").value;
    loadJsonData(searchText);
};
const loadJsonData = async searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    displayFoundItemsQuantity(jsonData.numFound); // itemsCount -> numFound
    displayRequiredBooks(jsonData.docs); // booksLists -> docs
};
const displayFoundItemsQuantity = itemsCount => {
    const foundItems = document.getElementById("found-items");
    foundItems.innerText = itemsCount;
};
const displayRequiredBooks = books => {
    const searchResult = document.getElementById("search-result");
    books.forEach(book => {
        // console.log(book);
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