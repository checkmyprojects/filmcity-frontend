/*const API_URL = 'http://localhost:8080/movies/'
    // const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    // const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    showMoviesCaroussel(data)
}
async function getMoviesSearch(url, searchterm) {
    const res = await fetch(url)
    const data = await res.json()
    let dataFilter = data.filter(obj => obj.title.toLowerCase().includes(searchterm.toLowerCase()))
    console.log(dataFilter)
    showMovies(dataFilter)
}

function showMoviesCaroussel(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, coverImage, synopsis, score } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `  <!-- Carousel -->
        <div id="demo" class="carousel slide" data-bs-ride="carousel">
    
            <!-- Indicators/dots -->
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>
    
            <!-- The slideshow/carousel -->
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${coverImage}" alt="${title}" class="d-block w-100">
                    <div class="carousel-caption">
                    <h5>${title}</h5>
                    <p> ${synopsis}</p>
                  </div>
                </div>
              
                
            </div>
    
            <!-- Left and right controls/icons -->
            <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
            <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
        </div>`


        main.appendChild(movieEl)
    })

}Jquery dynamic slide
*/
const API_URL = 'http://localhost:8080/movies/'

$(document).ready(function() {
    var movieList = [];
    getMovies(API_URL)

    async function getMovies(url) {
        const res = await fetch(url)
        const data = await res.json()
        showMoviesCaroussel(data)
    }

    function showMoviesCaroussel(movieList) {

        for (var i = 0; i < movieList.length; i++) {
            $('<div class="item"><img src="' + movieList[i] + '"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
            $('<li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators')

        }
        $('.item').first().addClass('active');
        $('.carousel-indicators > li').first().addClass('active');
        $('#carousel-example-generic').carousel();
    }

});