// Form elements
let movieFile = document.getElementById("movieFile");
let movieGenre = document.getElementById("movieGenre");
let movieRating = document.getElementById("movieRating");
let movieYear = document.getElementById("movieYear");
let movieStatus = document.getElementById("movieStatusSelect");

let updateBtn = document.getElementById("UpdateMovie");
let cancelBtn = document.getElementById("cancelEdit");

let searchMovie = document.getElementById("searchMovie");
let allStatus = document.getElementById("Allstatus");

let box2 = document.querySelector(".box2");

let movies = [
  {
    name: "Interstellar",
    genre: "Sci-Fi",
    rating: "9",
    year: "2014",
    status: "Watched"
  },
  {
    name: "The Dark Knight",
    genre: "Action",
    rating: "9",
    year: "2008",
    status: "Planned"
  }
];

let editIndex = -1;

function displayMovies() {

  let oldCards = document.querySelectorAll(".movie-card");

  for (let i = 0; i < oldCards.length; i++) {
    oldCards[i].remove();
  }

  let searchText = searchMovie.value.toLowerCase();
  let selectedStatus = allStatus.value;

  for (let i = 0; i < movies.length; i++) {

    let movie = movies[i];

    let matchesSearch =
      movie.name.toLowerCase().includes(searchText) ||
      movie.genre.toLowerCase().includes(searchText);

    let matchesStatus =
      selectedStatus === "All" ||
      movie.status === selectedStatus;

    if (matchesSearch && matchesStatus) {

      let movieCard = document.createElement("div");

      movieCard.className = "movie-card";

      movieCard.innerHTML = `
        <div class="movie-info">
          <h3>${movie.name}</h3>
          <p>${movie.genre} · ${movie.year} · ⭐ ${movie.rating}</p>
        </div>

        <div class="movie-actions">
          <span class="status">${movie.status}</span>

          <div class="buttons">
            <button class="edit-btn" onclick="editMovie(${i})">
              Edit
            </button>

            <button class="delete-btn" onclick="deleteMovie(${i})">
              Delete
            </button>
          </div>
        </div>
      `;

      box2.appendChild(movieCard);
    }
  }
}

updateBtn.addEventListener("click", function () {

  let name = movieFile.value.trim();
  let genre = movieGenre.value.trim();
  let rating = movieRating.value.trim();
  let year = movieYear.value.trim();
  let status = movieStatus.value;

  if (name === "" || genre === "" || rating === "" || year === "") {
    alert("Please fill all fields!");
    return;
  }

  if (editIndex !== -1) {

    movies[editIndex].name = name;
    movies[editIndex].genre = genre;
    movies[editIndex].rating = rating;
    movies[editIndex].year = year;
    movies[editIndex].status = status;

    editIndex = -1;

    updateBtn.textContent = "Update Movie";

  } else {

    movies.push({
      name: name,
      genre: genre,
      rating: rating,
      year: year,
      status: status
    });

  }

  clearForm();
  displayMovies();

});

function editMovie(index) {

  let movie = movies[index];

  movieFile.value = movie.name;
  movieGenre.value = movie.genre;
  movieRating.value = movie.rating;
  movieYear.value = movie.year;
  movieStatus.value = movie.status;

  editIndex = index;

  updateBtn.textContent = "Save Changes";

}

function deleteMovie(index) {

  movies.splice(index, 1);

  displayMovies();

}

cancelBtn.addEventListener("click", function () {

  editIndex = -1;

  updateBtn.textContent = "Update Movie";

  clearForm();

});

function clearForm() {

  movieFile.value = "";
  movieGenre.value = "";
  movieRating.value = "";
  movieYear.value = "";

  movieStatus.value = "Planned";

}

searchMovie.addEventListener("input", displayMovies);

allStatus.addEventListener("change", displayMovies);

displayMovies();