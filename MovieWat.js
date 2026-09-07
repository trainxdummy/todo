let movies = [
    {
        id: 1,
        title: "Interstellar",
        genre: "Sci-Fi",
        year: 2014,
        status: "Watched"
    },
    {
        id: 2,
        title: "The Dark Knight",
        genre: "Action",
        year: 2008,
        status: "Planned"
    }
];

let editId = null;

const movieForm = document.getElementById("movieForm");
const movieTitle = document.getElementById("movieTitle");
const genre = document.getElementById("genre");
const year = document.getElementById("year");
const status = document.getElementById("status");

const submitBtn = document.getElementById("submitBtn");
displayMovies();

movieForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const titleValue = movieTitle.value.trim();
    const genreValue = genre.value.trim();
    const yearValue = year.value;
    const statusValue = status.value;

    if (
        titleValue === "" ||
        genreValue === "" ||
        yearValue === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    if (editId !== null) {

        const movie = movies.find(function (movie) {
            return movie.id === editId;
        });

        movie.title = titleValue;
        movie.genre = genreValue;
        movie.year = yearValue;
        movie.status = statusValue;

        alert("Movie updated successfully!");

        editId = null;

        submitBtn.innerText = "Add Movie";

    }

    else {

        const newMovie = {

            id: Date.now(),

            title: titleValue,

            genre: genreValue,

            year: yearValue,

            status: statusValue

        };

        movies.push(newMovie);

    }


    movieForm.reset();

    displayMovies();

});

function displayMovies() {

    const movieList = document.getElementById("movieList");

    const searchValue =
        document.getElementById("searchInput").value
        .toLowerCase();

    const filterValue =
        document.getElementById("filterStatus").value;

    const filteredMovies = movies.filter(function (movie) {

        const matchesSearch =
            movie.title
                .toLowerCase()
                .includes(searchValue);

        const matchesStatus =
            filterValue === "All" ||
            movie.status === filterValue;

        return matchesSearch && matchesStatus;

    });


    movieList.innerHTML = "";

    if (filteredMovies.length === 0) {

        movieList.innerHTML = `
            <div class="empty">
                No movies found.
            </div>
        `;

        return;
    }


    // Create movie cards

    filteredMovies.forEach(function (movie) {

        const movieDiv = document.createElement("div");

        movieDiv.className = "movie";


        const statusClass =
            movie.status.toLowerCase();


        movieDiv.innerHTML = `

            <div class="movie-left">

                <div class="movie-title">
                    ${movie.title}
                </div>

                <div class="movie-info">
                    ${movie.genre} • ${movie.year}
                </div>

            </div>


            <div class="movie-right">

                <span class="status ${statusClass}">
                    ${movie.status}
                </span>

                <button
                    class="edit-btn"
                    onclick="editMovie(${movie.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteMovie(${movie.id})"
                >
                    Delete
                </button>

            </div>

        `;
        movieList.appendChild(movieDiv);

    });

}

function editMovie(id) {

    const movie = movies.find(function (movie) {
        return movie.id === id;
    });


    if (!movie) {
        return;
    }


    movieTitle.value = movie.title;

    genre.value = movie.genre;

    year.value = movie.year;

    status.value = movie.status;


    editId = id;


    submitBtn.innerText = "Update Movie";


    // Scroll to form

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

function deleteMovie(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this movie?");


    if (!confirmDelete) {
        return;
    }


    movies = movies.filter(function (movie) {

        return movie.id !== id;

    });
    if (editId === id) {

        cancelEdit();

    }


    displayMovies();

}
function cancelEdit() {

    editId = null;

    movieForm.reset();

    submitBtn.innerText = "Add Movie";

}