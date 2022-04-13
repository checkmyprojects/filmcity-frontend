$(document).ready(function() {
    $("#changeButton").click(function() {
        $("#updateModal").modal();
    });
    $('.editable ul').on('click', 'li', function() {
        if ($(this).hasClass('li_selected')) {
            $(this).removeClass('li_selected');
        } else {
            $(this).addClass('li_selected');
        }
    });
    var mainSutable = $('#mainSutable').DataTable({
        paging: false,
        ordering: true,
        info: false,
        searching: false,
        scrollY: '62.2vh',
        scrollX: true,
        scrollCollapse: true,
        drawCallback: function() {
            $('.dataTables_scrollBody').css('height', '185px'); //forces height to ##px after every redraw
            $('.dataTables_scrollBody').css('background-image', 'url("https://i.imgur.com/Z9WyhV1.png")'); //force a grid image (self-created) as background, always
            $('.dataTables_scrollBody').css('background-repeat', 'repeat');
        },
    });
    var text = "CHILDREN'S MEDICAL CENTER OF DISTRICT 7";
    var name = "Johnathan Hendrix";
    var telNum = "1234567890";
    var cusEmail = "longemail@longemail.com";
    $("#bus-name").html("<span>" + text + "</span>");
    $("#cusName").append("<span>" + name + "</span>");
    $("#telNum").append("<span>" + telNum + "</span>");
    $("#cusEmail").append("<span>" + cusEmail + "</span>");
});



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
    movieAlone.innerHTML = ` <div class="container mt-2"> 
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
     <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#home">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#profile"><i class="bi bi-file-plus-fill"></i></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#contact">
            <button   onclick="deleteOneMovie('${API_URL+id}')"class="left" ><i class="bi bi-trash"></i></button>
            </a>
        </li>
        <li class="nav-item">
           <a class="nav-link left" data-bs-toggle="tab" href="#edit"> <i class="bi bi-pen"></i></a>
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
        <div class="tab-pane" id="profile">
            <div class="row border g-0 rounded shadow-sm">
                <div class="col p-4">
                    <h3>Profile</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div class="col-auto">
                    <img src="images/profile.jpg" class="img-thumbnail dimension">
                </div>
            </div>
        </div>
        <div class="tab-pane" id="contact">
            <div class="row border g-0 rounded shadow-sm">
                <div class="col p-4">
                    <h3>Contact</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div class="col-auto">
                    <img src="images/contact.jpg" class="img-thumbnail dimension">
                </div>
            </div>
        </div>
        <div class="tab-pane" id="edit">
        <div class="row border g-0 rounded shadow-sm">
            <div class="col p-4">
                <h3>Edit</h3>
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