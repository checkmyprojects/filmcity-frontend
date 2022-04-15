const API_URL = 'http://localhost:8080/movies/';
const search = document.getElementById('search')
const button = document.querySelector('#save');
const openMovie = document.querySelector('#openMovie');
const movies = [];
const main = document.getElementById('main')

// const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
// const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'


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
    const { title, coverImage, synopsis, score, year, id, booked, director, renter } = movie
    const movieAlone = document.createElement('div')
    movieAlone.classList.add('movie_single')
    movieAlone.innerHTML = ` <div class="container mt-2"> 
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
     <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#home">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab"  href="#create"><i class="bi bi-file-plus-fill"></i></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#delete">
            <button   onclick="deleteOneMovie('${API_URL+id}')"class="left" ><i class="bi bi-trash"></i></button>
            </a>
        </li>
        <li class="nav-item">
           <a class="nav-link left" data-bs-toggle="tab" href="#edite" > <i class="bi bi-pen"></i></a>
          </li>
          <li class="nav-item">
          <a class="nav-link left" data-bs-toggle="tab"  href="#RentAndRate" > <img src="../images/rent.png"></a>
         </li>
       
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="home">
            <div class="row border g-0 rounded shadow-sm">
                <div class="col p-4">
                    <h3>"${title}"</h3>
                    <span>"${year}"</span>
                    <p>"${synopsis}"</p>
                </div>
                <div class="col-auto">
                    <img src="${coverImage}" class="img-thumbnail dimension">
                </div>
            </div>
        </div>
        <div class="tab-pane" id="edite">
            <div class="row border g-0 rounded shadow-sm">
                <div class="col p-4">
                    <h6>Editar Pelicula</h6>
                    <form id="myForm">
                    <input type="text" id="id" class="search" placeholder="id" style={{diplay:none}}>
                    <input type="text" id="title" class="search" placeholder="title" value="${title}">
                    <input type="text" id="coverImage" class="search" placeholder="coverImage" value="${coverImage}">
                    <input type="text" id="director" class="search" placeholder="director"value="${director}">
                    <input type="text" id="year" class="search" placeholder="year"value="${year}">
                    <input type="text" id="synopsis" class="search" placeholder="synopsis" value="${synopsis}">
                    <input type="text" id="renter" class="search" placeholder="renter" value="${renter}">
                    <input type="text" id="booked" class="search" placeholder="booked" value="${booked}">
                    <input type="text" id="score" class="search" placeholder="score" value="${score}">
                     <button  onclick="testingUpdate()">Update</button>
                  </form>
                </div>
                <div class="col-auto">
                   img id="coverImagePic" src="${coverImage}" alt=""> 
                </div>
            </div>
        </div>
        <div class="tab-pane" id="create">
            <div class="row border g-0 rounded shadow-sm">
            <div class="col-center" id="container">

            <form class="col-md-12 bg-form">
                <div class="orb">
                    <img src="images/nave.png" alt="nave">
                </div>
                <div class="mb-3 custom-size">
                    <label for="title " class="form-label ">title</label>
                    <input type="text " class="form-control bg-input-padding" id="title " aria-describedby="emailHelp ">
                </div>
                <div class="mb-3 custom-size">
                    <label for="coverImage" class="form-label ">Imagen</label>
                    <input type="text" class="form-control bg-input-padding" id="coverImage">
                </div>
                <div class="mb-3 custom-size">
                    <label for="director" class="form-label ">Director</label>
                    <input type="text" class="form-control bg-input-padding" id="director">
                </div>
                <div class="mb-3 custom-size">
                    <label for="year" class="form-label ">año</label>
                    <input type="number" class="form-control bg-input-padding" id="year">
                </div>
                <div class="mb-3 custom-size">
                    <label for="synopsis" class="form-label ">synopsis</label>
                    <textarea type="text" class="form-control bg-input-padding" id="synopsis"></textarea>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="renter ">
                    <label class="form-check-label" for="renter">Alquilada</label>
                </div>
                <button type="submit " onclick="saveMovie()" class="btn btn-primary right">Enviar</button>
                <button type="button" class="btn btn-primary"><span class="bi bi-trash"></span> Borrar</button>
                <button type="button" class="btn btn-primary"><span class="bi bi-brush"></span> Editar</button>
    
            </form>
        </div>
               
            </div>
        </div>
        <div class="tab-pane" id="RentAndRate">
        <div class="row border g-0 rounded shadow-sm">
        <div class="col p-4">
        <h6>Editar Pelicula</h6>
        <form id="formAndRate">
        <input type="text" id="id" class="search" placeholder="id" style={{diplay:none}}>
        <input type="text" id="renter" class="search" placeholder="renter" value="${renter}">
        <input type="text" id="booked" class="search" placeholder="booked" value="${booked}">
        <input type="text" id="score" class="search" placeholder="booked" value="${score}">
        <article class="rating">
        <select name="color" id="color">
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
        <span>DELETE</span>
        <span>SAVE</span>
        <span>EDIT</span>
      </article>
         <button  onclick="rentMovie()">Rent&Rate</button>
      </form>
    </div>
    <div class="col-auto">
       img id="coverImagePic" src="${coverImage}" alt=""> 
    </div>
</div>
</div>
        <div class="tab-pane" id="delete">
        <div class="row border g-0 rounded shadow-sm">
            <div class="col p-4">
                <h3>delete</h3>
            </div>
            <div class="col-auto">
                <img src="images/contact.jpg" class="img-thumbnail dimension">
            </div>
        </div>
      </div>
   </div>
 </div>
      </div>
     </div>
      </div>
    `
    single_main.appendChild(movieAlone)
}

function testingUpdate() {
    const form = document.getElementById("myForm");
    console.log(form)
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

function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = data.get('id', 'title', 'year', 'director', 'synopsis', 'score', 'renter');
    console.log({ value });
}



function updateMovie() {
    let data = {}
    data.id = document.getElementById('id').value
    data.title = document.getElementById('title').value
    data.coverImage = document.getElementById('coverImage').value
    data.director = document.getElementById('director').value
    data.year = document.getElementById('year').value
    data.synopsis = document.getElementById('synopsis').value
    data.renter = document.getElementById('renter').value
    data.booked = document.getElementById('booked').value
    data.score = document.getElementById('score').value
    console.log(data)
    modifyMovie(data);
    window.location.href = "index.html";
}


async function modifyMovie(data) {
    console.log("clicked modify")
    const response2 = await fetch('http://127.0.0.1:8080/movies', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    window.location.reload()
    console.log(` the movie to update is ${data.id}`)
}
async function createMovie(data) {
    const response2 = await fetch('http://127.0.0.1:8080/movies', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function saveMovie() {
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
    window.location.href = "index.html";
}

function rentMovie() {
    // take user name from a prompt window and store it
    let movieId = document.getElementById('id').value
    let booked = document.getElementById('booked').value
    console.log(booked)
    if (booked === "true") {
        console.log("booked")
        const response = fetch(`http://127.0.0.1:8080/movies/${movieId}/return`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            }
        });
        console.log(response)
        alert("Movie Returned!!!")
    } else if (booked === "false") {
        let renter = "Usuario"
        renter = window.prompt("Introduce tu nombre para alquilar", "Usuario");
        const response2 = fetch(`http://127.0.0.1:8080/movies/${movieId}/book?renter=${renter}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            }
        });
        console.log(response2)
        alert("Movie Booked!!!")
    }
    window.location.href = "index.html";
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