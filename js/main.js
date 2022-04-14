const API_URL = 'http://localhost:8080/movies/'

const main = document.getElementById('main')
const form = document.getElementById('formTop')
const search = document.getElementById('search')

// -----------------BUTTONS----------------

let buttonDelete = document.getElementById('buttonDelete')
let buttonSave = document.getElementById('buttonSave')
let buttonRent = document.getElementById('buttonRent')
// let buttonEdit = document.getElementById('buttonEdit')
// actions
buttonDelete.addEventListener("click", deleteMovie)
buttonRent.addEventListener("click", rentMovie)
buttonRent.addEventListener("click", rentMovie)

// ---------------END BUTTONS----------------


// MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
// let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}
function showMovieModal(url){
    modal.style.display = "block";
    getOneMovie(url)
}

// MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL


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

function showMovies(movies) {
    main.innerHTML = ''
    main.innerHTML= `
    <div id="addBtn" class="d-flex align-center justify-content-center">
        <img class="addimg" onClick="showModal('')" src="./img/add_+_Movies.png">
    </div>`

    

    movies.forEach((movie) => {
        const { title, coverImage, synopsis, score } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img onClick="showMovieModal('${API_URL+movie.id}')" src="${coverImage}" alt="${title}">
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
///////////////////////////////////////////////////////////////////////////
async function getOneMovie(url) {
    const res = await fetch(url)
    const data = await res.json()
    console.log(url)
    showMovie(data)
}

////////////////////////////////////////////////////////////////////////////////////
///CREATE MOVIE
function showModal() {
    modal.style.display = 'block';
    document.getElementById('id').value = '';
    document.getElementById('title').value = '';
    document.getElementById('titleTop').innerHTML = "Movie Title";
    document.getElementById('coverImage').value = '';
    document.getElementById('coverImagePic').src = '';
    document.getElementById('director').value = '';
    document.getElementById('year').value = '';
    document.getElementById('synopsis').value = '';
    document.getElementById('renter').value = '';
    document.getElementById('booked').value = '';
    document.getElementById('score').value = '';
    document.getElementById('mymodal').style.backgroundImage= '';

}

////////////////////////////////////////////////////////////////////////////////////
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
//     //animation nave
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

async function getMoviesSearch(url, searchterm) {
    const res = await fetch(url)
    const data = await res.json()
    let dataFilter = data.filter(obj => obj.title.toLowerCase().includes(searchterm.toLowerCase()))
    console.log(dataFilter)
    showMovies(dataFilter)
}


// SINGLE MOVIE SINGLE MOVIE SINGLE MOVIE SINGLE MOVIE SINGLE MOVIE SINGLE MOVIE SINGLE MOVIE SINGLE MOVIE

async function getOneMovie(url) {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    printMovie(data)
}
async function modifyMovie(data){
    const response2 = await fetch('http://127.0.0.1:8080/movies', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    alert("Movie Saved!!!")
}
async function printMovie(data){
    document.getElementById('id').value = data.id
    document.getElementById('title').value = data.title
    document.getElementById('titleTop').innerHTML = data.title
    document.getElementById('coverImage').value = data.coverImage
    document.getElementById('coverImagePic').src = data.coverImage
    document.getElementById('director').value = data.director
    document.getElementById('year').value = data.year
    document.getElementById('synopsis').value = data.synopsis
    document.getElementById('renter').value = data.renter
    document.getElementById('booked').value = data.booked
    document.getElementById('score').value = data.score
    if(data.booked){
        document.getElementById('mymodal').style.backgroundImage=`url(./img/rentedcover.jpg)`;
    }else{
        document.getElementById('mymodal').style.backgroundImage=`url(${data.coverImage})`;

    }

}
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
    if(dataModified.id != ""){
        modifyMovie(dataModified);
    }else if(dataModified.id ==""){
        delete dataModified.id;
        addMovie(dataModified);
    }

async function addMovie(data){
    const response2 = await fetch('http://127.0.0.1:8080/movies', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    alert("Movie Saved!!!")
}

}

// SINGLE MOVIE SINGLE MOVIE SINGLE MOVIE SINGLE MOVIE SINGLE MOVIE SINGLE MOVIE SINGLE MOVIE SINGLE MOVIE

// Function to set the renter

function rentMovie(){
    // take user name from a prompt window and store it
    let movieId = document.getElementById('id').value
    let booked = document.getElementById('booked').value
    console.log(booked)
    if(booked === "true"){
        console.log("booked")
        const response = fetch(`http://127.0.0.1:8080/movies/${movieId}/return`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            }
        });
        console.log(response)
        alert("Movie Returned!!!")
    }else if(booked === "false"){
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
}


// end renter function

// delete movie
async function deleteMovie(){
    let movieId = document.getElementById('id').value;
    const response2 = await fetch(`http://127.0.0.1:8080/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
    alert("Movie Deleted!!!")
}

// end delete movie



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


  const rate = document.getElementById("color");

  rate.addEventListener("change", function()
  {
       let data = {}
       data.score = parseInt(rate.options[rate.selectedIndex].value);
       
       fetch(`http://127.0.0.1:8080/movies/${document.getElementById("id").value}/rating`, {
           method:"PUT",
           headers: {
             'Content-type': 'application/json'
           }, 
           body: JSON.stringify(data)
        });
  });