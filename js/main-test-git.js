const API_URL = 'http://localhost:8080/movies/';
const search = document.getElementById('search')
const button = document.querySelector('#save');
const openModal = document.querySelector('#openModal');
const movies = [];
const main = document.getElementById('main')

// const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
// const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'





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
        const { title, coverImage, score, id, booked } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `<a data-bs-toggle="modal" data-bs-target="#single-movie"
        onclick="getOneMovie('${API_URL+id}')">
        <img src="${coverImage}" alt="${title}"> 
          </a>
            <div class="movie-info"> 
            <h6>${title}</h6>
            <div class="ratings"> <span class="product-rating">${score}</span><span>/5</span></div>
            <div class="stars"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
            </div>
           </div>
        `
        if (booked) {
            movieEl.classList.add('movie-rented')
        }
        main.appendChild(movieEl)

    })
}

const single_main = document.getElementById('single_main')
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
    movieAlone.innerHTML = ` <div class="container mt-2" id ="myborder"> 
    <button type="button" class="btn-close right" data-bs-dismiss="modal" aria-label="Close"></button>
     <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#home">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab"  href="#create"><i class="bi bi-file-plus-fill"></i></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#delete">
            <a  onclick="deleteOneMovie('${API_URL+id}')"class="nav-link left" ><i class="bi bi-trash"></i></a>
            </a>
        </li>
        <li class="nav-item">
           <a class="nav-link left" data-bs-toggle="tab" href="#edite" > <i class="bi bi-pen"></i></a>
          </li>
          <li class="nav-item">
          <a class="nav-link left" data-bs-toggle="tab"  href="#rate"> <img src="../images/rentIcon.png"> </a>
         </li>
         <li class="nav-item">
         <a class="nav-link left" data-bs-toggle="tab"  href="#rent"><img src="../images/rent.png"></a>
        </li>
       
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="home">
            <div class="row border g-0 rounded shadow-sm">
                <div class="col p-4">
                    <h3>"${title}"</h3>
                    <span>"${year}"</span>
                    <h6> Director:${director}</h6>
                    <p>"${synopsis}"</p>
                </div>
                <div class="col-auto" id="card-img">
                    <img src="${coverImage}" class="img-thumbnail dimension">
                   
                </div>
            </div>
        </div>
        <div class="tab-pane" id="edite">
            <div class="row border g-0 rounded shadow-sm">
                <div class="col p-4">
                    <h6>Editar Pelicula</h6>
                    <form id="updateMovie">
                    <input type="text" id="id" name="id" class="search" placeholder="id" value="${id}"style={{diplay:none}}>
                    <input type="text" id="title" class="search" placeholder="title" name="title" value="${title}">
                    <input type="text" id="coverImage" name="coverImage"class="search" placeholder="coverImage" value="${coverImage}">
                    <input type="text" id="director" class="search" name="director"placeholder="director"value="${director}">
                    <input type="text" id="year" class="search"name="year" placeholder="year"value="${year}">
                    <input type="text" id="synopsis" class="search" name="synopsis"placeholder="synopsis" value="${synopsis}">
                    <input type="text" id="renter" class="search" placeholder="renter"name="renter" value="${renter}">
                    <input type="text" id="booked" class="search" placeholder="booked" name="rent"value="${booked}">
                    <input type="text" id="score" class="search" placeholder="score" name="score"value="${score}">
                     <button type="button"  onclick="testingUpdate()">Update</button>
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

            <form class="col-md-12 bg-form" id="createMovie">
                <div class="orb">
                    <img src="images/nave.png" alt="nave">
                </div>
                
                <div class="mb-3 custom-size">
                    <label for="title " class="form-label ">title</label>
                    <input type="text " class="form-control bg-input-padding" id="title " aria-describedby="emailHelp" name="title">
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
                <button type="button" onclick="createMovie()" class="btn btn-primary right">crear</button>
              
    
            </form>
        </div>
               
            </div>
        </div>
        <div class="tab-pane" id="rent">
        <div class="row border g-0 rounded shadow-sm">
        <div class="col p-4">
        <h6>Editar Pelicula</h6>
        <form id="rentMovie">
<input type="text" id="id" class="search" name="id" placeholder="id" style={{diplay:none}} value="${id}">
        <input type="text" id="renter" name ="renter"class="search" placeholder="renter" value="${renter}">
        <input type="text" id="booked" name ="booked" class="search" placeholder="booked" value="${booked}">
       
          <button type="button" onclick="rentMovie()">Rent</button>
      </form>
    </div>

</div>
</div>
        <div class="tab-pane" id="rate">
        <div class="row border g-0 rounded shadow-sm">
        <div class="col p-4">
        <h6>Editar Pelicula</h6>
        <form id="rateAndRentMovie">

        <input type="text" id="id" class="search" name="id" placeholder="id" style={{diplay:none}} value="${id}">
        <input type="text" id="renter" name ="renter"class="search" placeholder="renter" value="${renter}">
        <input type="text" id="booked" name ="book" class="search" placeholder="booked" value="${booked}">
        <input type="text" id="score" name="score" class="search" placeholder="score" value="${score}" >
          <button type="button" onclick="rateMovie()">Rate</button>
      </form>
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
/*
        @PutMapping("/movies/{id}/book")
@PutMapping("/movies/{id}/return")
@PutMapping("/movies/{id}/rating")
String renter = null;
boolean booked = false;
int score;*/

function rateMovie() {
    const formData = new FormData(document.querySelector('#rateAndRentMovie'));
    /*const rentInput = document.querySelector('input[name="book"]');
    const idInput = document.querySelector('input[name="id"]')
    const rateInput = document.querySelector('input[name="score"]') //selecting the input with name property "name"
    const renterInput = document.querySelector('input[name="renter"]')
*/
    const movie = {
        id: formData.get('id'),
        book: formData.get('book'),
        score: formData.get('score'),
        renter: formData.get('renter')

    }

    fetch(`http://127.0.0.1:8080/movies/${movie.id}/rating`, {
            method: 'PUT',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => {
            alertManager('error', error);
            document.querySelector('#formAdd').reset();
        })
        .then(response => {
            alertManager('success', response.mensaje)
            showMovies();
        })

    console.log(` the movie to rate and rate is ${movie.title}`)
    window.location.reload()

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

const titleInput = document.querySelector('input[name="title"].value'); //selecting the input with name property "name"
const coverImageInput = document.querySelector('input[name="coverImage"]')
const idInput = document.querySelector('input[name="id"]') //selecting the input with name property "name"
const directorInput = document.querySelector('input[name="director"]') //selecting the input with name property "name"
const yearInput = document.querySelector('input[name="year"]')
const synopsisInput = document.querySelector('input[name="synopsis"]') //selecting the input with name property "name"
const scoreInput = document.querySelector('input[name="score"]')
const rentInput = document.querySelector('input[name="rent"]') //selecting the input with name property "name"
const renterInput = document.querySelector('input[name="renter"]')



function testingUpdate() {
    const formData = new FormData(document.querySelector('#updateMovie'));
    /*  const titleInput = document.querySelector('input[name="title"].value');
    const coverImageInput = document.querySelector('input[name="coverImage"]')
    const directorInput = document.querySelector('input[name="director"]') //selecting the input with name property "name"
    const yearInput = document.querySelector('input[name="year"]')
    const synopsisInput = document.querySelector('input[name="synopsis"]')
    const idInput = document.querySelector('input[name="id"]')
*/

    const movie = {
        id: formData.get('id'),
        title: formData.get('title'),
        coverImage: formData.get('coverImage'),
        director: formData.get('director'),
        year: formData.get('year'),
        synopsis: formData.get('synopsis'),
    }
    console.log(movie);
    fetch(API_URL, {
            method: 'PUT',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => {
            alertManager('error', error);
            document.querySelector('#formAdd').reset();
        })
        .then(response => {
            alertManager('success', response.mensaje)
            showMovies();
        })
    console.log(`the movie to update is ${movie.id}`)
    window.location.href = "index_modal.html";
    window.location.reload()


}

function createMovie() {
    const formData = new FormData(document.querySelector('#createMovie'));
    const titleInput = document.querySelector('input[name="title"]');
    const coverImageInput = document.querySelector('input[name="coverImage"]')
    const directorInput = document.querySelector('input[name="director"]') //selecting the input with name property "name"
    const yearInput = document.querySelector('input[name="year"]')
    const synopsisInput = document.querySelector('input[name="synopsis"]')


    const movie = {
        title: formData.get('title'),
        coverImage: formData.get('coverImage'),
        director: formData.get('director'),
        year: formData.get('year'),
        synopsis: formData.get('synopsis'),
    }

    console.log(movie)

    fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => {
            alertManager('error', error);
            document.querySelector('#formAdd').reset();
        })
        .then(response => {
            alertManager('success', response.mensaje)
            showMovies();
        })

    console.log(` the movie to update is ${movie.title}`)
    window.location.reload()

}

/*const updateData = () => {
    const title = titleInput.value //store value from name input into name variable
    const id = idInput.value //store value from age input into age variable
    const newMovie = { title, id } // create new person object
    people.push(newMovie) //push the new person object into the array
    renderData() //render the data again so it reflects the new data
}*/

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

function rentMovie() {
    // take user name from a prompt window and store it
    let movieId = document.getElementById('id').value
    let booked = document.getElementById('booked').value
    if (booked === "true") {
        console.log("booked")
        const response = fetch(`http://127.0.0.1:8080/movies/${movieId}/return`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            }
        });
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
    window.location.href = "index_modal.html";
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

//Alert Manager
/** ALERT */
const alertManager = (typeMsg, message) => {
        const alert = document.querySelector('#alert');

        alert.innerHTML = message || 'Se produjo cambios';
        alert.classList.add(typeMsg);
        alert.style.display = 'block';

        setTimeout(() => {
            alert.style.display = 'none';
            alert.classList.remove(typeMsg);
        }, 3500);

    }
    /*const rate = document.getElementById("color");

    rate.addEventListener("change", function() {
        let data = {}
        data.score = parseInt(rate.options[rate.selectedIndex].value);

        fetch(`http://127.0.0.1:8080/movies/${document.getElementById("id").value}/rating`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    });*/