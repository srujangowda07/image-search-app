const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.querySelector('.search-results');
const showMoreBtn = document.getElementById('show-more-btn');

let page = 1;
const accessKey = "GeoJO5Hbu1pCEM8ZIE3k9p7nnhpdjDYOeTD-4_mGOqo";

async function searchImages() {
    let query = searchInput.value;
    const url = "https://api.unsplash.com/search/photos?page=" + page + "&query=" + query + "&client_id=" + accessKey + "&per_page=12";

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResults.innerHTML = '';
    }

    const results = data.results;

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-res');

        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const link = document.createElement('a');
        link.href = result.links.html;
        link.target = '_blank';
        link.innerText = result.alt_description || 'View Image';

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(link);
        searchResults.appendChild(imageWrapper);
    }

    if (data.total_pages > page) {
        showMoreBtn.style.display = 'inline-block';
    } else {
        showMoreBtn.style.display = 'none';
    }
}

searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener('click', function() {
    page++;
    searchImages();
});
