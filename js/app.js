const searchBook = () => {
    const searchText = document.getElementById("search-field").value;
    fetchApi(searchText);
}
const fetchApi = (searchText) => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(jsonData => displayFoundItems(jsonData)) //numFound
}
const displayFoundItems = (itemsCount) => {
    const foundItems = document.getElementById("found-items");
    foundItems.innerText = itemsCount.numFound;
}