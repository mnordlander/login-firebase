// Replace 'API_KEY' with your actual API key from TMDb
const apiKey = '390bfa7fbb6fe1b41f8593c5d2330b89';

let currentPage = 1
const movieWrapper = document.getElementById('movie-wrapper');
function fetchMovies() {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    // Set up the request
    xhr.open('GET', `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}`);

    // Define the onload function to handle the response
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Request was successful
            const response = JSON.parse(xhr.responseText);

            const movieList = response.results.map(movie => template(movie)).join('');
            movieWrapper.innerHTML += movieList;

            console.log(response);


        } else {
            // Request failed
            console.log('Error:', xhr.status);
        }
    };

    // Send the request for each page
    xhr.send();

} // end: fetchMovies()

fetchMovies();



function template(movie) {
    return `
<div onclick="fetchMovieDetails(${movie.id})" class="movie-card-wrapper">
<div class="gradient"></div>
<h3>${movie.original_title}</h3>
<img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" width="100%" alt="${movie.original_title} Poster">
<div class="movie-backdrop-footer">
<p class="title">Average vote <span style="color:yellow;">${movie.vote_average}</span></p> <p>(${movie.vote_count})</i> </p>
</div>
</div>
`;
}

function nextMoviePage(page) {
    currentPage = page;
    movieWrapper.innerHTML = "";
    fetchMovies();
}

function fetchMovieDetails(movieId) {
    const url = `movie-details.html?=${movieId}`
    window.location.href = url
}