// ================================
// GET HTML ELEMENTS
// ================================

const movieForm = document.getElementById("movieForm");

const titleInput = document.getElementById("title");
const genreInput = document.getElementById("genre");
const yearInput = document.getElementById("year");
const statusInput = document.getElementById("status");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

const movieList = document.getElementById("movieList");
const emptyMessage = document.getElementById("emptyMessage");

const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");


// ================================
// MOVIE ARRAY
// ================================

let movies = JSON.parse(localStorage.getItem("movies")) || [];

let editingId = null;


// ================================
// SAVE MOVIES
// ================================

function saveMovies() {

    localStorage.setItem("movies", JSON.stringify(movies));

}


// ================================
// FORM SUBMIT
// ================================

movieForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // Check validation

    if (!validateForm()) {
        return;
    }


    const title = titleInput.value.trim();

    const genre = genreInput.value.trim();

    const year = Number(yearInput.value);

    const status = statusInput.value;


    // ============================
    // UPDATE MOVIE
    // ============================

    if (editingId !== null) {

        const movie = movies.find(function(movie) {

            return movie.id === editingId;

        });


        movie.title = title;

        movie.genre = genre;

        movie.year = year;

        movie.status = status;

    }


    // ============================
    // ADD MOVIE
    // ============================

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


    // Save

    saveMovies();


    // Reset edit mode

    editingId = null;

    submitBtn.textContent = "Add Movie";

    cancelBtn.hidden = true;


    // Reset form

    movieForm.reset();


    // Display

    displayMovies();

});


// ================================
// VALIDATION
// ================================

function validateForm() {

    let valid = true;


    // Clear errors

    document.getElementById("titleError").textContent = "";

    document.getElementById("genreError").textContent = "";

    document.getElementById("yearError").textContent = "";


    // Title

    if (titleInput.value.trim() === "") {

        document.getElementById("titleError").textContent =
            "Movie title is required.";

        valid = false;

    }


    // Genre

    if (genreInput.value.trim() === "") {

        document.getElementById("genreError").textContent =
            "Genre is required.";

        valid = false;

    }


    // Year

    const year = Number(yearInput.value);

    const currentYear = new Date().getFullYear();


    if (
        yearInput.value === "" ||
        year < 1888 ||
        year > currentYear + 5
    ) {

        document.getElementById("yearError").textContent =
            "Enter a valid release year.";

        valid = false;

    }


    return valid;
}


// ================================
// DISPLAY MOVIES
// ================================

function displayMovies() {

    movieList.innerHTML = "";


    let filteredMovies = [...movies];


    // ============================
    // SEARCH
    // ============================

    const searchText =
        searchInput.value.trim().toLowerCase();


    if (searchText !== "") {

        filteredMovies = filteredMovies.filter(function(movie) {

            return movie.title
                .toLowerCase()
                .includes(searchText);

        });

    }


    // ============================
    // FILTER STATUS
    // ============================

    const selectedStatus = filterStatus.value;


    if (selectedStatus !== "All") {

        filteredMovies = filteredMovies.filter(function(movie) {

            return movie.status === selectedStatus;

        });

    }


    // ============================
    // EMPTY STATE
    // ============================

    if (filteredMovies.length === 0) {

        emptyMessage.style.display = "block";

    }

    else {

        emptyMessage.style.display = "none";

    }


    // ============================
    // CREATE MOVIE CARDS
    // ============================

    filteredMovies.forEach(function(movie) {

        const card = createMovieCard(movie);

        movieList.appendChild(card);

    });

}


// ================================
// CREATE MOVIE CARD
// ================================

function createMovieCard(movie) {

    const card = document.createElement("div");

    card.classList.add("movie-card");


    // ============================
    // LEFT SIDE
    // ============================

    const details = document.createElement("div");

    details.classList.add("movie-details");


    const title = document.createElement("h3");

    title.classList.add("movie-title");

    title.textContent = movie.title;


    const meta = document.createElement("p");

    meta.classList.add("movie-meta");

    meta.textContent =
        `${movie.genre} · ${movie.year}`;


    details.appendChild(title);

    details.appendChild(meta);


    // ============================
    // RIGHT SIDE
    // ============================

    const actions = document.createElement("div");

    actions.classList.add("movie-actions");


    // Status

    const status = document.createElement("span");

    status.classList.add("status");

    status.classList.add(
        movie.status.toLowerCase()
    );

    status.textContent = movie.status;


    // Buttons

    const buttons = document.createElement("div");

    buttons.classList.add("card-buttons");


    // Edit

    const editButton = document.createElement("button");

    editButton.textContent = "Edit";

    editButton.classList.add("edit-btn");


    editButton.addEventListener("click", function() {

        editMovie(movie.id);

    });


    // Delete

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.classList.add("delete-btn");


    deleteButton.addEventListener("click", function() {

        deleteMovie(movie.id);

    });


    buttons.appendChild(editButton);

    buttons.appendChild(deleteButton);


    actions.appendChild(status);

    actions.appendChild(buttons);


    // ============================
    // CARD
    // ============================

    card.appendChild(details);

    card.appendChild(actions);


    return card;
}


// ================================
// EDIT MOVIE
// ================================

function editMovie(id) {

    const movie = movies.find(function(movie) {

        return movie.id === id;

    });


    if (!movie) {
        return;
    }


    // Put values inside form

    titleInput.value = movie.title;

    genreInput.value = movie.genre;

    yearInput.value = movie.year;

    statusInput.value = movie.status;


    // Store ID

    editingId = id;


    // Change button

    submitBtn.textContent = "Update Movie";

    cancelBtn.hidden = false;


    // Scroll to form

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ================================
// CANCEL EDIT
// ================================

cancelBtn.addEventListener("click", function() {

    editingId = null;


    movieForm.reset();


    submitBtn.textContent = "Add Movie";

    cancelBtn.hidden = true;


    // Clear errors

    document.getElementById("titleError").textContent = "";

    document.getElementById("genreError").textContent = "";

    document.getElementById("yearError").textContent = "";

});


// ================================
// DELETE MOVIE
// ================================

function deleteMovie(id) {

    const movie = movies.find(function(movie) {

        return movie.id === id;

    });


    if (!movie) {
        return;
    }


    const confirmed = confirm(
        `Are you sure you want to delete "${movie.title}"?`
    );


    if (!confirmed) {
        return;
    }


    movies = movies.filter(function(movie) {

        return movie.id !== id;

    });


    saveMovies();

    displayMovies();

}


// ================================
// SEARCH
// ================================

searchInput.addEventListener("input", function() {

    displayMovies();

});


// ================================
// FILTER
// ================================

filterStatus.addEventListener("change", function() {

    displayMovies();

});


// ================================
// INITIAL DISPLAY
// ================================

displayMovies();