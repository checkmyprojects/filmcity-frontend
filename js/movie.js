const API_URL = 'http://localhost:8080/movies/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

const button = document.querySelector('#save');
button.addEventListener('click', saveMovie);

document.addEventListener("DOMContentLoaded", getOneMovie('http://localhost:8080/movies/1'));  

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
}
async function printMovie(data){
    document.getElementById('id').value = data.id
    document.getElementById('title').value = data.title
    document.getElementById('coverImage').value = data.coverImage
    document.getElementById('coverImagePic').src = data.coverImage
    document.getElementById('director').value = data.director
    document.getElementById('year').value = data.year
    document.getElementById('synopsis').value = data.synopsis
    document.getElementById('renter').value = data.renter
    document.getElementById('booked').value = data.booked
    document.getElementById('score').value = data.score
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
    modifyMovie(dataModified);


}




// Get initial movies
// getMovies(API_URL)

// async function getMovies(url) {
//     const res = await fetch(url)
//     const data = await res.json()
//     console.log(data)
//     showMovies(data)
// }
// async function getMoviesSearch(url, searchterm) {
//     const res = await fetch(url)
//     const data = await res.json()
//     let dataFilter = data.filter(obj => obj.title.toLowerCase().includes(searchterm.toLowerCase()))
//     console.log(dataFilter)
//     showMovies(dataFilter)
// }

// function showMovies(movies) {
//     main.innerHTML = ''

//     movies.forEach((movie) => {
//         const { title, coverImage, synopsis, score} = movie

//         const movieEl = document.createElement('div')
//         movieEl.classList.add('movie')

//         movieEl.innerHTML = `
//             <img src="${coverImage}" alt="${title}">
//             <div class="movie-info">
//           <h3>${title}</h3>
//            <span class="${getClassByRate(score)}">${score}</span>
//             </div>
//             <div class="overview">
//           <h3>Synopsis</h3>
//           ${synopsis}
//         </div>
//         `
//         main.appendChild(movieEl)
//     })
// }

// function getClassByRate(vote) {
//     if(vote >= 4) {
//         return 'green'
//     } else if(vote >= 2) {
//         return 'orange'
//     } else {
//         return 'red'
//     }
// }

// form.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const searchTerm = search.value

//     if(searchTerm && searchTerm !== '') {
//         getMoviesSearch(API_URL, searchTerm)

//         search.value = ''
//     } else {
//         window.location.reload()
//     }
// })