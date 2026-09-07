let movieForm = document.getElementById("movieForm");

let movieTitle = document.getElementById("movieTitle");
let genre = document.getElementById("genre");
let year = document.getElementById("year");
let status = document.getElementById("status");

let movieList = document.getElementById("movieList");

let searchInput = document.getElementById("searchInput");
let filterStatus = document.getElementById("filterStatus");

let submitButton = document.getElementById("submitButton");
let cancelButton = document.getElementById("cancelButton");
let formTitle = document.getElementById("formTitle");

let movies = JSON.parse(localStorage.getItem("movies")) || [
    {
        title: "Interstellar",
        genre: "Sci-Fi",
        year: "2014",
        status: "Watched"
    },
    {
        title: "The Dark Knight",
        genre: "Action",
        year: "2008",
        status: "Planned"
    }
];

let editIndex = -1;

displayMovies();

movieForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let titleValue = movieTitle.value;
    let genreValue = genre.value;
    let yearValue = year.value;
    let statusValue = status.value;

    let movie = {
        title: titleValue,
        genre: genreValue,
        year: yearValue,
        status: statusValue
    };

    if (editIndex === -1) {

        movies.push(movie);

    } else {

        movies[editIndex] = movie;

        editIndex = -1;

        submitButton.innerText = "Add Movie";
        formTitle.innerText = "Add Movie";
    }

    localStorage.setItem("movies", JSON.stringify(movies));

    displayMovies();

    movieForm.reset();

});

function displayMovies() {

    movieList.innerHTML = "";

    let searchText = searchInput.value.toLowerCase();

    let selectedStatus = filterStatus.value;

    let foundMovie = false;

    for (let i = 0; i < movies.length; i++) {

        let movie = movies[i];

        let matchesSearch =
            movie.title.toLowerCase().includes(searchText);

        let matchesStatus =
            selectedStatus === "All" ||
            movie.status === selectedStatus;

        if (matchesSearch && matchesStatus) {

            foundMovie = true;

            let movieDiv = document.createElement("div");

            movieDiv.className = "movie";

            let movieLeft = document.createElement("div");

            movieLeft.className = "movie-left";

            let movieHeading = document.createElement("h3");

            movieHeading.innerText = movie.title;

            let movieInfo = document.createElement("p");

            movieInfo.className = "movie-info";

            movieInfo.innerText =
                movie.genre + " · " + movie.year;

            movieLeft.appendChild(movieHeading);
            movieLeft.appendChild(movieInfo);

            let movieRight = document.createElement("div");

            movieRight.className = "movie-right";

            let statusText = document.createElement("span");

            statusText.className =
                "status " + movie.status.toLowerCase();

            statusText.innerText = movie.status;

            let movieButtons = document.createElement("div");

            movieButtons.className = "movie-buttons";

            let editButton = document.createElement("button");

            editButton.className = "edit-button";

            editButton.innerText = "Edit";

            let deleteButton = document.createElement("button");

            deleteButton.className = "delete-button";

            deleteButton.innerText = "Delete";

            editButton.addEventListener("click", function() {
                editMovie(i);
            });

            deleteButton.addEventListener("click", function() {
                deleteMovie(i);
            });

            movieButtons.appendChild(editButton);
            movieButtons.appendChild(deleteButton);

            movieRight.appendChild(statusText);
            movieRight.appendChild(movieButtons);

            movieDiv.appendChild(movieLeft);
            movieDiv.appendChild(movieRight);

            movieList.appendChild(movieDiv);
        }
    }

    if (foundMovie === false) {

        let message = document.createElement("p");

        message.className = "no-movies";

        message.innerText = "No movies found.";

        movieList.appendChild(message);
    }
}

function editMovie(index) {

    let movie = movies[index];

    movieTitle.value = movie.title;
    genre.value = movie.genre;
    year.value = movie.year;
    status.value = movie.status;

    editIndex = index;

    submitButton.innerText = "Update Movie";

    formTitle.innerText = "Add / Update Movie";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function deleteMovie(index) {

    let answer = confirm("Are you sure you want to delete this movie?");

    if (answer) {

        movies.splice(index, 1);

        localStorage.setItem(
            "movies",
            JSON.stringify(movies)
        );

        displayMovies();
    }
}

cancelButton.addEventListener("click", function() {

    movieForm.reset();

    editIndex = -1;

    submitButton.innerText = "Add Movie";

    formTitle.innerText = "Add Movie";

});

searchInput.addEventListener("input", function() {

    displayMovies();

});

filterStatus.addEventListener("change", function() {

    displayMovies();

});