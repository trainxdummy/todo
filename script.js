// State Management
let movies = JSON.parse(localStorage.getItem('movies')) || [];
let editModeId = null;

// DOM Elements
const form = document.getElementById('movie-form');
const titleInput = document.getElementById('title');
const genreInput = document.getElementById('genre');
const yearInput = document.getElementById('year');
const statusInput = document.getElementById('status');
const submitBtn = document.getElementById('submit-btn');
const cancelEditBtn = document.getElementById('cancel-edit');
const formTitle = document.getElementById('form-title');
const movieContainer = document.getElementById('movie-container');
const searchInput = document.getElementById('search-input');
const filterStatus = document.getElementById('filter-status');
const themeToggle = document.getElementById('theme-toggle');

// Initialize App
function init() {
    // Check local storage for dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    renderMovies();
    updateStats();
}

// Render Movies to the DOM
function renderMovies() {
    movieContainer.innerHTML = '';
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterStatus.value;

    // Apply Search & Filter
    const filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
        const matchesFilter = filterValue === 'All' || movie.status === filterValue;
        return matchesSearch && matchesFilter;
    });

    // Empty State Handling
    if (filteredMovies.length === 0) {
        movieContainer.innerHTML = `
            <div class="empty-state">
                <p>No movies found. Try adding one or adjusting your filters!</p>
            </div>
        `;
        return;
    }

    // Generate Cards
    filteredMovies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        
        card.innerHTML = `
            <div>
                <div class="movie-header">
                    <h3 class="movie-title">${movie.title}</h3>
                    <span class="badge ${movie.status.toLowerCase()}">${movie.status}</span>
                </div>
                <div class="movie-details">
                    <p><strong>Genre:</strong> ${movie.genre}</p>
                    <p><strong>Year:</strong> ${movie.year}</p>
                </div>
            </div>
            <div class="movie-actions">
                <button class="btn-edit" onclick="editMovie('${movie.id}')">Edit</button>
                <button class="btn-delete" onclick="deleteMovie('${movie.id}')">Delete</button>
            </div>
        `;
        movieContainer.appendChild(card);
    });
}

// Add or Update Movie
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic Validation is handled by HTML5, but we ensure no blank strings
    const title = titleInput.value.trim();
    const genre = genreInput.value.trim();
    const year = parseInt(yearInput.value, 10);
    const status = statusInput.value;

    if (!title || !genre || !year || !status) return;

    if (editModeId) {
        // Update existing movie
        const index = movies.findIndex(m => m.id === editModeId);
        if (index !== -1) {
            movies[index] = { id: editModeId, title, genre, year, status };
        }
        resetFormState();
    } else {
        // Create new movie
        const newMovie = {
            id: Date.now().toString(),
            title,
            genre,
            year,
            status
        };
        movies.push(newMovie);
    }

    saveAndRender();
    form.reset();
});

// Delete Movie
function deleteMovie(id) {
    if (confirm('Are you sure you want to delete this movie from your watchlist?')) {
        movies = movies.filter(movie => movie.id !== id);
        saveAndRender();
        
        // If deleting the movie currently being edited, reset the form
        if (editModeId === id) resetFormState();
    }
}

// Setup Edit Mode
function editMovie(id) {
    const movie = movies.find(m => m.id === id);
    if (!movie) return;

    // Populate form
    titleInput.value = movie.title;
    genreInput.value = movie.genre;
    yearInput.value = movie.year;
    statusInput.value = movie.status;

    // Change UI for edit mode
    editModeId = id;
    formTitle.textContent = 'Edit Movie';
    submitBtn.textContent = 'Update Movie';
    cancelEditBtn.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Cancel Edit Mode
cancelEditBtn.addEventListener('click', resetFormState);

function resetFormState() {
    form.reset();
    editModeId = null;
    formTitle.textContent = 'Add a Movie';
    submitBtn.textContent = 'Add Movie';
    cancelEditBtn.classList.add('hidden');
}

// Update Statistics
function updateStats() {
    const total = movies.length;
    const watched = movies.filter(m => m.status === 'Watched').length;
    const planned = movies.filter(m => m.status === 'Planned').length;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-watched').textContent = watched;
    document.getElementById('stat-planned').textContent = planned;
}

// Helper: Save to LocalStorage and trigger renders
function saveAndRender() {
    localStorage.setItem('movies', JSON.stringify(movies));
    renderMovies();
    updateStats();
}

// Event Listeners for Search and Filter
searchInput.addEventListener('input', renderMovies);
filterStatus.addEventListener('change', renderMovies);

// Dark Mode Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

// Run Init on Load
init();