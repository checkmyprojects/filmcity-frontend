const API_URL = 'http://localhost:8080/movies/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// get movies
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
async function getOneMovie(url){
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    showOneMovie(data)

}
function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { id, title, coverImage, synopsis, score } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img onclick="getOneMovie('${API_URL+id}')" src="${coverImage}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
           <span class="${getClassByRate(score)}">${score}</span>
            </div>
            <div class="overview">
          <h3>Synopsis</h3>
          ${synopsis}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function showOneMovie(movie) {
    main.innerHTML = ''

        const movieEl = document.createElement('div')
        movieEl.classList.add('singleMovie')

        movieEl.innerHTML = `
        <form id="form">
        <input type="text" id="id" class="search" placeholder="id" value='${movie.id}'>
        <input type="text" id="title" class="search" placeholder="title" value='${movie.title}'>
        <input type="text" id="coverImage" class="search" placeholder="coverImage" value='${movie.coverImage}'>
        <input type="text" id="director" class="search" placeholder="director" value='${movie.director}'>
        <input type="text" id="year" class="search" placeholder="year" value='${movie.year}'>
        <input type="text" id="synopsis" class="search" placeholder="synopsis" value='${movie.synopsis}'>
        <input type="text" id="renter" class="search" placeholder="renter" value='${movie.renter}'>
        <input type="text" id="booked" class="search" placeholder="booked" value='${movie.booked}'>
        <input type="text" id="score" class="search" placeholder="score" value='${movie.score}'>
        <img onclick="saveMovie()"  id="coverImagePic" src='${movie.coverImage}' alt="">
        <button onclick="saveMovie()" id="save">SAVE</button>
        <button onclick="deleteMovie('${API_URL+movie.id}')">DELETE</button>
      </form>
        `
        main.appendChild(movieEl)
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

    function saveMovie(){
        let dataModified = {}
        dataModified.id = document.getElementById('id').value
        dataModified.title = document.getElementById('title').value
        dataModified.coverImage = document.getElementById('coverImage').value
        dataModified.director = document.getElementById('director').value
        dataModified.year = document.getElementById('year').value
        dataModified.synopsis = document.getElementById('synopsis').value
        dataModified.renter = document.getElementById('renter').value
        dataModified.booked = document.getElementById('booked').value
        dataModified.score = document.getElementById('score').value
        modifyMovie(dataModified);
    
    
    }
    async function modifyMovie(data){
        fetch('http://127.0.0.1:8080/movies', {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
          });
    }

    // delete_url = http://localhost:8080/movies/delete + id
async function deleteMovie(delete_url)
{
    const response = await fetch(delete_url, {method:"DELETE"});
    console.log(await response.json());
    // const response2 = await fetch("http://127.0.0.1:8080/movies/");
    // showMovies(await response2.json());
}
    //animation nave
// const orb = document.querySelector('.orb'),
//     ease = 0.05,
//     start_position = orb.offsetTop;
// let scroll_request = 0,
//     total_offset = 0,
//     animation_running = false;

// function animate_scroll() {
//     scroll_request++;
//     if (!animation_running) {
//         animation_running = true;
//         animation_loop();
//     }
// }
// scroll_request++;

// if (!animation_running) {
//     animation_running = true;
//     animation_loop();
// }

// function animation_loop() {
//     let current_offset = window.pageYOffset;
//     let difference = current_offset_total_offset;
//     different *= ease;
//     if (Math.abs(difference) < 0.05) {
//         scroll_request = 0;
//         total_offset = current_offset;
//         animation_running = false;
//         return;
//     }
//     orb.style.top = `${start_position-total_offset}px`;
//     total_offset += difference;
//     requestAnimationFrame(animation_loop);
// }