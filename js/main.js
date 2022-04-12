const API_URL = 'http://localhost:8080/movies/'
<<<<<<< HEAD
// const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
// const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
=======
    // const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const rate = document.getElementById('rateMe1')
>>>>>>> modal

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
            <div>
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
    single_main.innerHTML = '';
    const { title, coverImage, synopsis, score, year } = movie
    const movieAlone = document.createElement('div')
    movieAlone.classList.add('movie_single')
    movieAlone.innerHTML = `	<div class="card movie_card">
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
      </div>`
    single_main.appendChild(movieAlone)
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

<<<<<<< HEAD
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
=======
//animation nave
const orb = document.querySelector('.orb'),
    ease = 0.05,
    start_position = orb.offsetTop;
let scroll_request = 0,
    total_offset = 0,
    animation_running = false;

function animate_scroll() {
    scroll_request++;
    if (!animation_running) {
        animation_running = true;
        animation_loop();
    }
}
scroll_request++;

if (!animation_running) {
    animation_running = true;
    animation_loop();
}

function animation_loop() {
    let current_offset = window.pageYOffset;
    let difference = current_offset_total_offset;
    different *= ease;
    if (Math.abs(difference) < 0.05) {
        scroll_request = 0;
        total_offset = current_offset;
        animation_running = false;
        return;
    }
    orb.style.top = `${start_position-total_offset}px`;
    total_offset += difference;
    requestAnimationFrame(animation_loop);
}

//jquery bootstrap stars
// Rating Initialization
$(document).ready(function() {
    $('#rateMe1').mdbRate();
});
>>>>>>> modal
