
const movieForm = document.getElementById("movieForm");

const movieTitle = document.getElementById("movieTitle");
const movieGenre = document.getElementById("movieGenre");
const releaseYear = document.getElementById("releaseYear");
const movieStatus = document.getElementById("movieStatus");

const movieList = document.getElementById("movieList");
const emptyState = document.getElementById("emptyState");
const movieCount = document.getElementById("movieCount");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

let movies = [];
let editId = null;


// =========================
// ADD / UPDATE MOVIE
// =========================

movieForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = movieTitle.value.trim();
    const genre = movieGenre.value.trim();
    const year = Number(releaseYear.value);
    const status = movieStatus.value;

    // Validation
    if (title === "") {
        alert("Please enter movie title.");
        return;
    }

    if (genre === "") {
        alert("Please enter movie genre.");
        return;
    }

    const currentYear = new Date().getFullYear();

    if (releaseYear.value === "") {
        alert("Please enter release year.");
        return;
    }

    if (year < 1888 || year > currentYear) {
        alert(`Please enter a year between 1888 and ${currentYear}.`);
        return;
    }

    if (status === "") {
        alert("Please select movie status.");
        return;
    }


    // UPDATE
    if (editId !== null) {

        movies = movies.map(function (movie) {

            if (movie.id === editId) {
                return {
                    id: movie.id,
                    title: title,
                    genre: genre,
                    year: year,
                    status: status
                };
            }

            return movie;
        });

    }

    // ADD
    else {

        const newMovie = {
            id: Date.now(),
            title: title,
            genre: genre,
            year: year,
            status: status
        };

        movies.push(newMovie);
    }


    renderMovies();
    resetForm();
});


// =========================
// DISPLAY MOVIES
// =========================

function renderMovies() {

    movieList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value;


    const filteredMovies = movies.filter(function (movie) {

        const titleMatch =
            movie.title.toLowerCase().includes(searchText);

        const statusMatch =
            selectedStatus === "All" ||
            movie.status === selectedStatus;

        return titleMatch && statusMatch;
    });


    // EMPTY STATE
    if (filteredMovies.length === 0) {

        emptyState.style.display = "block";

        if (movies.length === 0) {

            emptyState.querySelector("h3").textContent =
                "No movies added yet";

            emptyState.querySelector("p").textContent =
                "Your watchlist is empty. Add your first movie!";

        } else {

            emptyState.querySelector("h3").textContent =
                "No movies found";

            emptyState.querySelector("p").textContent =
                "Try changing your search or filter.";
        }

    } else {

        emptyState.style.display = "none";
    }


    // CREATE CARDS
    filteredMovies.forEach(function (movie) {

        const card = document.createElement("div");

        card.className = "movie-card";

        card.innerHTML = `
            <h3>${movie.title}</h3>

            <p class="movie-info">
                <strong>Genre:</strong> ${movie.genre}
            </p>

            <p class="movie-info">
                <strong>Release Year:</strong> ${movie.year}
            </p>

            <span class="status ${movie.status.toLowerCase()}">
                ${movie.status}
            </span>

            <div class="movie-actions">

                <button
                    class="edit-btn"
                    onclick="editMovie(${movie.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteMovie(${movie.id})">
                    Delete
                </button>

            </div>
        `;

        movieList.appendChild(card);
    });


    movieCount.textContent =
        `${filteredMovies.length} ${
            filteredMovies.length === 1 ? "Movie" : "Movies"
        }`;
}


// =========================
// EDIT MOVIE
// =========================

function editMovie(id) {

    const movie = movies.find(function (movie) {
        return movie.id === id;
    });

    if (!movie) {
        return;
    }


    editId = id;


    movieTitle.value = movie.title;
    movieGenre.value = movie.genre;
    releaseYear.value = movie.year;
    movieStatus.value = movie.status;


    submitBtn.textContent = "Update Movie";

    cancelBtn.hidden = false;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =========================
// DELETE MOVIE
// =========================

function deleteMovie(id) {

    const movie = movies.find(function (movie) {
        return movie.id === id;
    });

    if (!movie) {
        return;
    }


    const confirmDelete = confirm(
        `Are you sure you want to delete "${movie.title}"?`
    );


    if (!confirmDelete) {
        return;
    }


    movies = movies.filter(function (movie) {
        return movie.id !== id;
    });


    renderMovies();
}


// =========================
// RESET FORM
// =========================

function resetForm() {

    movieForm.reset();

    editId = null;

    submitBtn.textContent = "Add Movie";

    cancelBtn.hidden = true;
}


// =========================
// CANCEL EDIT
// =========================

cancelBtn.addEventListener("click", function () {

    resetForm();

});


// =========================
// SEARCH
// =========================

searchInput.addEventListener("input", function () {

    renderMovies();

});


// =========================
// FILTER
// =========================

statusFilter.addEventListener("change", function () {

    renderMovies();

});


// =========================
// INITIAL LOAD
// =========================

renderMovies();

