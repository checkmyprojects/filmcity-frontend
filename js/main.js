const API_URL = 'http://localhost:8080/movies/'
    // const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')


// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    showMovies(data)
}
async function getMoviesSearch(url, searchterm) {
    const res = await fetch(url)
    const data = await res.json()
    let dataFilter = data.filter(obj => obj.title.toLowerCase().includes(searchterm.toLowerCase()))
    console.log(dataFilter)
    showMovies(dataFilter)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, coverImage, synopsis, score, id } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
       
        <a data-bs-toggle="modal" data-bs-target="#single-movie" id="openMovie">
   
          <img src="${coverImage}" alt="${title}"> 
          </a>
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(score)}">${score}</span>
            </div>
            <div>
          <h3 id="openSingle">${id}</h3>
         
         
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
$(document).ready(function() {
    $('#input-3').rating({ displayOnly: true, step: 0.5 });
    $('#input-5').rating({ clearCaption: 'No stars yet' });
    $('#input-8').rating({ rtl: true, containerClass: 'is-star' });
    $('#input-9').rating();
});