const API_URL = 'http://localhost:8080/movies/'
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
    showMovies(data)
}

function showMovies(movies) {
    main.innerHTML = ''
    main.innerHTML= `
    <div id="addBtn" class="d-flex align-center justify-content-center">
        <a id="btnAdd" data-bs-toggle="modal" data-bs-target="#exampleModal" style="float: left;">
            <i class="light bi bi-plus-circle" style="font-size: 14rem;"></i><span></span>
        </a>
    </div>`

    movies.forEach((movie) => {
        const { title, coverImage, synopsis, score} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${coverImage}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
           <span class="${getClassByRate(score)}">${score}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${synopsis}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 4) {
        return 'green'
    } else if(vote >= 2) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMoviesSearch(API_URL, searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})

async function getMoviesSearch(url, searchterm) {
    const res = await fetch(url)
    const data = await res.json()
    let dataFilter = data.filter(obj => obj.title.toLowerCase().includes(searchterm.toLowerCase()))
    console.log(dataFilter)
    showMovies(dataFilter)
}

//HAM MENU
document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown){
      everydropdown.addEventListener('shown.bs.dropdown', function () {
          el_overlay = document.createElement('span');
          el_overlay.className = 'screen-darken';
          document.body.appendChild(el_overlay)
      });
  
      everydropdown.addEventListener('hide.bs.dropdown', function () {
        document.body.removeChild(document.querySelector('.screen-darken'));
      });
    });
  
  }); 