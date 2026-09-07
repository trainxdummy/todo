let form = document.querySelector("form");

let title = document.querySelector("#title");
let genre = document.querySelector("#genre");
let year = document.querySelector("#year");
let status = document.querySelector("#Status");

let movies = document.querySelector(".movies");

let search = document.querySelector(".search");
let filter = document.querySelector(".filter");

let cancelButton = document.querySelector(".cancel-button");
let updateButton = document.querySelector(".update-button");

let movieList = [];

let editIndex = -1;


function showMovies(list) {

    movies.innerHTML = "";

    list.forEach(function(movie, index) {

        let movieDiv = document.createElement("div");

        movieDiv.className = "movie";

        movieDiv.innerHTML = `
            <div class="movie-info">
                <h4>${movie.title}</h4>
                <p>${movie.genre} - ${movie.year}</p>
            </div>

            <div class="movie-right">
                <span class="status">${movie.status}</span>

                <button class="edit-button" onclick="editMovie(${index})">
                    Edit
                </button>

                <button class="delete-button" onclick="deleteMovie(${index})">
                    Delete
                </button>
            </div>
        `;

        movies.appendChild(movieDiv);
    });
}


form.addEventListener("submit", function(event) {

    event.preventDefault();

    if (title.value == "" || genre.value == "" || year.value == "" || status.value == "") {
        return;
    }

    let newMovie = {
        title: title.value,
        genre: genre.value,
        year: year.value,
        status: status.value
    };

    if (editIndex == -1) {

        movieList.push(newMovie);

    } else {

        movieList[editIndex] = newMovie;

        editIndex = -1;

        updateButton.innerText = "Add Movie";
    }

    form.reset();

    showMovies(movieList);
});


function editMovie(index) {

    let movie = movieList[index];

    title.value = movie.title;
    genre.value = movie.genre;
    year.value = movie.year;
    status.value = movie.status;

    editIndex = index;

    updateButton.innerText = "Update Movie";
}


function deleteMovie(index) {

    movieList.splice(index, 1);

    showMovies(movieList);
}


cancelButton.addEventListener("click", function() {

    form.reset();

    editIndex = -1;

    updateButton.innerText = "Add Movie";
});


search.addEventListener("input", function() {

    let value = search.value.toLowerCase();

    let filteredMovies = movieList.filter(function(movie) {

        return movie.title.toLowerCase().includes(value);

    });

    showMovies(filteredMovies);
});


filter.addEventListener("change", function() {

    let value = filter.value;

    if (value == "all") {

        showMovies(movieList);

    } else {

        let filteredMovies = movieList.filter(function(movie) {

            return movie.status == value;

        });

        showMovies(filteredMovies);
    }
});


showMovies(movieList);