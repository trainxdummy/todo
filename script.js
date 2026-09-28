
const movieForm = document.getElementById('movieForm');
const movieIdInput = document.getElementById('movieId');
const titleInput = document.getElementById('title');
const genreInput = document.getElementById('genre');
const yearInput = document.getElementById('year');
const statusSelect = document.getElementById('status');
const submitButton = document.getElementById('submitButton');
const cancelButton = document.getElementById('cancelButton');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');
const movieList = document.getElementById('movieList');

const defaultMovies = [
  { id: '1', title: 'Inception', genre: 'Sci-Fi', year: 2010, status: 'Watched' },
  { id: '2', title: 'Interstellar', genre: 'Sci-Fi', year: 2014, status: 'Watched' },
  { id: '3', title: 'Dune: Part Two', genre: 'Action / Sci-Fi', year: 2024, status: 'Planned' }
];


let movies = JSON.parse(localStorage.getItem('movies')) || defaultMovies;

function saveMovies() {
  localStorage.setItem('movies', JSON.stringify(movies));
}


function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderMovies() {
  const searchTerm = (searchInput.value || '').trim().toLowerCase();
  const selectedStatus = filterSelect.value;

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.genre.toLowerCase().includes(searchTerm);

    const matchesStatus =
      selectedStatus === 'All' || movie.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  if (filteredMovies.length === 0) {
    movieList.innerHTML = `<div class="empty">No movies found.</div>`;
    return;
  }

  movieList.innerHTML = filteredMovies
    .map(
      (movie) => `
      <article class="movie" data-id="${movie.id}">
        <div class="movie-info">
          <h3>
            ${escapeHTML(movie.title)}
            <span class="badge">${escapeHTML(movie.status)}</span>
          </h3>
          <p class="meta">${escapeHTML(movie.genre)} • ${escapeHTML(String(movie.year))}</p>
        </div>
        <div class="movie-actions">
          <button type="button" class="secondary edit-btn" data-id="${movie.id}">Edit</button>
          <button type="button" class="delete delete-btn" data-id="${movie.id}">Delete</button>
        </div>
      </article>
    `
    )
    .join('');
}

function resetForm() {
  movieForm.reset();
  movieIdInput.value = '';
  submitButton.textContent = 'Add Movie';
  cancelButton.hidden = true;
}

movieForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const genre = genreInput.value.trim();
  const year = parseInt(yearInput.value, 10);
  const status = statusSelect.value;
  const editingId = movieIdInput.value;

  if (!title || !genre || isNaN(year)) return;

  if (editingId) {
 
    movies = movies.map((movie) =>
      movie.id === editingId
        ? { ...movie, title, genre, year, status }
        : movie
    );
  } else {
  
    const newMovie = {
      id: Date.now().toString(),
      title,
      genre,
      year,
      status
    };
    movies.unshift(newMovie);
  }

  saveMovies();
  resetForm();
  renderMovies();
});


movieList.addEventListener('click', (e) => {
  const target = e.target;
  const id = target.dataset.id;
  if (!id) return;

  if (target.classList.contains('edit-btn')) {
    const movieToEdit = movies.find((movie) => movie.id === id);
    if (!movieToEdit) return;

    movieIdInput.value = movieToEdit.id;
    titleInput.value = movieToEdit.title;
    genreInput.value = movieToEdit.genre;
    yearInput.value = movieToEdit.year;
    statusSelect.value = movieToEdit.status;

    submitButton.textContent = 'Update Movie';
    cancelButton.hidden = false;
    titleInput.focus();
  }


  if (target.classList.contains('delete-btn')) {
    const confirmed = confirm('Are you sure you want to delete this movie?');
    if (!confirmed) return;

    movies = movies.filter((movie) => movie.id !== id);

    if (movieIdInput.value === id) {
      resetForm();
    }

    saveMovies();
    renderMovies();
  }
});


cancelButton.addEventListener('click', resetForm);

searchInput.addEventListener('input', renderMovies);
filterSelect.addEventListener('change', renderMovies);

renderMovies();