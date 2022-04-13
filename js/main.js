const API_URL = 'http://localhost:8080/movies/';
const movies = [];


// const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
// const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const single_main = document.getElementById('single_main')
    // Rating Initialization
function rateOn() {
    rate.mdbRate();
};

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
    movies.forEach((movie) => {
        const { title, coverImage, score, id } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `<a data-bs-toggle="modal" data-bs-target="#single-movie"
        onclick="getOneMovie('${API_URL+id}')">
        
        <img src="${coverImage}" alt="${title}"> 
          </a>
            <div class="movie-info">
          <h6>${title}</h6>
          <div class="container">
         <span id="rateMe1"class="${getClassByRate(score)}></span>
          </div>
         </div>
        `
        main.appendChild(movieEl)

    })
}

function getClassByRate(vote) {
    if (vote >= 4) {
        return 'green'
    } else if (vote >= 2) {
        return 'orange'
    } else {
        return 'red'
    }
}
async function getOneMovie(url) {
    const res = await fetch(url)
    const data = await res.json()
    console.log(url)
    showMovie(data)
}

function showMovie(movie) {
    single_main.innerHTML = ``;
    const { title, coverImage, synopsis, score, year, id } = movie
    const movieAlone = document.createElement('div')
    movieAlone.classList.add('movie_single')
    movieAlone.innerHTML = `<div class="modal-header">
    <a class="left"> <i class="bi bi-pen"></i></a>
    <button   onclick="deleteOneMovie('${API_URL+id}')"class="left" ><i class="bi bi-trash"></i></button>
    <a data-bs-toggle="modal" data-bs-target="#exampleModal" class="left"><i class="bi bi-file-plus-fill"></i></a>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>


</div>
    <div class="card movie_card">
    
        <img src="${coverImage}" class="card-img-top" alt="...">
        <div class="card-body">
            <i class="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
            </i>
          <h5 class="card-title">"${title}"</h5>
                 <span class="movie_info">"${year}"</span>
                 <p>${synopsis}"</p>
                 <div class="container">
                 <span id="rateMe1">"${score}"</span>
        </div>
                 
        </div>
      </div>
      </div>
      `
    single_main.appendChild(movieAlone)
}


async function deleteOneMovie(urlId) {
    const response = await fetch(urlId, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
    });
    window.location.reload()
    console.log(` the movie to delete is ${urlId}`)
}


async function createNewProfile(profile) {
    const formData = new FormData();
    formData.append('first_name', profile.firstName);
    formData.append('last_name', profile.lastName);
    formData.append('email', profile.email);
    return fetch('http://example.com/api/v1/registration', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
}

async function modifyMovie(data) {
    const response2 = await fetch('http://127.0.0.1:8080/movies', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    async function createMovie(data) {
        const response2 = await fetch('http://127.0.0.1:8080/movies', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}







async function getMoviesSearch(url, searchterm) {
    const res = await fetch(url)
    const data = await res.json()
    let dataFilter = data.filter(obj => obj.title.toLowerCase().includes(searchterm.toLowerCase()))
    console.log(dataFilter)
    showMovies(dataFilter)
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
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown) {
        everydropdown.addEventListener('shown.bs.dropdown', function() {
            el_overlay = document.createElement('span');
            el_overlay.className = 'screen-darken';
            document.body.appendChild(el_overlay)
        });

        everydropdown.addEventListener('hide.bs.dropdown', function() {
            document.body.removeChild(document.querySelector('.screen-darken'));
        });
    });

});