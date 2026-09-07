// Initial State mimicking the screenshot
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

let editingId = null;

// DOM Elements
const movieForm = document.getElementById('movie-form');
const titleInput = document.getElementById('title');
const genreInput = document.getElementById('genre');
const yearInput = document.getElementById('year');
const statusInput = document.getElementById('status');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const movieListContainer = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const filterStatus = document.getElementById('filter-status');

// Initialize App
function init() {
    renderMovies(movies);
    
    // Event Listeners
    movieForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);
    searchInput.addEventListener('input', filterMovies);
    filterStatus.addEventListener('change', filterMovies);
}

// Render Movies to DOM
function renderMovies(moviesToRender) {
    movieListContainer.innerHTML = '';
    
    if (moviesToRender.length === 0) {
        movieListContainer.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 1rem;">No movies found.</p>';
        return;
    }

    moviesToRender.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.className = 'movie-item';
        
        movieEl.innerHTML = `
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <div class="movie-meta">${movie.genre} · ${movie.year}</div>
            </div>
            <div class="movie-actions">
                <span class="badge">${movie.status}</span>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-sm" onclick="editMovie(${movie.id})">Edit</button>
                    <button class="btn btn-delete btn-sm" onclick="deleteMovie(${movie.id})">Delete</button>
                </div>
            </div>
        `;
        
        movieListContainer.appendChild(movieEl);
    });
}

// Handle Add / Update
function handleFormSubmit(e) {
    e.preventDefault();
    
    const movieData = {
        title: titleInput.value.trim(),
        genre: genreInput.value.trim(),
        year: parseInt(yearInput.value),
        status: statusInput.value
    };

    if (editingId) {
        // Update existing movie
        movies = movies.map(movie => 
            movie.id === editingId ? { ...movieData, id: editingId } : movie
        );
    } else {
        // Add new movie
        const newId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
        movies.push({ ...movieData, id: newId });
    }

    resetForm();
    filterMovies(); // Re-render reflecting current search/filters
}

// Prepare Form for Editing
window.editMovie = function(id) {
    const movie = movies.find(m => m.id === id);
    if (!movie) return;

    editingId = id;
    
    titleInput.value = movie.title;
    genreInput.value = movie.genre;
    yearInput.value = movie.year;
    statusInput.value = movie.status;
    
    submitBtn.textContent = 'Update Movie';
    cancelBtn.classList.remove('hidden');
    
    // Smooth scroll to top for editing
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Delete Movie
window.deleteMovie = function(id) {
    if(confirm("Are you sure you want to delete this movie?")) {
        movies = movies.filter(movie => movie.id !== id);
        
        // If deleting the movie currently being edited, reset the form
        if (editingId === id) {
            resetForm();
        }
        
        filterMovies();
    }
}

// Reset Form State
function resetForm() {
    movieForm.reset();
    editingId = null;
    submitBtn.textContent = 'Add Movie';
    cancelBtn.classList.add('hidden');
    
    // Set default status to match original screenshot behavior if needed
    statusInput.value = "Planned"; 
}

// Filter and Search Logic
function filterMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusFilter = filterStatus.value;
    
    const filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm) || 
                              movie.genre.toLowerCase().includes(searchTerm);
        
        const matchesStatus = statusFilter === 'All statuses' || movie.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    renderMovies(filteredMovies);
}

// Run init on load
init();