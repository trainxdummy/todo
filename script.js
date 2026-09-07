let movies = [];
let editIndex = -1;

const form = document.getElementById("movieForm");
const list = document.getElementById("movieList");
const search = document.getElementById("searchInput");
const filter = document.getElementById("filterStatus");
const themeBtn = document.getElementById("themeBtn");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let movie = {
        title: movieTitle.value,
        genre: movieGenre.value,
        year: releaseYear.value,
        status: movieStatus.value
    };

    if (editIndex == -1)
        movies.push(movie);
    else {
        movies[editIndex] = movie;
        editIndex = -1;
    }

    form.reset();
    displayMovies();
});

function displayMovies() {
    let text = search.value.toLowerCase();
    let status = filter.value;

    let result = movies.filter(m =>
        m.title.toLowerCase().includes(text) &&
        (status == "All" || m.status == status)
    );

    list.innerHTML = result.map((m, i) => `
        <div class="movie-card">
            <h3>${m.title}</h3>
            <p>Genre: ${m.genre}</p>
            <p>Year: ${m.year}</p>
            <p>Status: ${m.status}</p>
            <button onclick="editMovie(${movies.indexOf(m)})">Edit</button>
            <button onclick="deleteMovie(${movies.indexOf(m)})">Delete</button>
        </div>
    `).join("");

    document.getElementById("movieCount").textContent =
        result.length + " movies";

    document.getElementById("emptyState").style.display =
        result.length ? "none" : "block";

    document.getElementById("totalMovies").textContent = movies.length;
    document.getElementById("plannedMovies").textContent =
        movies.filter(m => m.status == "Planned").length;
    document.getElementById("watchedMovies").textContent =
        movies.filter(m => m.status == "Watched").length;
}

function editMovie(i) {
    movieTitle.value = movies[i].title;
    movieGenre.value = movies[i].genre;
    releaseYear.value = movies[i].year;
    movieStatus.value = movies[i].status;
    editIndex = i;
}

function deleteMovie(i) {
    if (confirm("Delete this movie?")) {
        movies.splice(i, 1);
        displayMovies();
    }
}

search.addEventListener("input", displayMovies);
filter.addEventListener("change", displayMovies);

themeBtn.onclick = function() {
    document.body.classList.toggle("dark");
    themeBtn.textContent =
        document.body.classList.contains("dark") ? "☀️" : "🌙";
};

displayMovies();

