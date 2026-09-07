const movies = [
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

let editIndex = -1;

function addMovie() {

    let title = document.getElementById("title").value;
    let genre = document.getElementById("genre").value;
    let year = document.getElementById("year").value;
    let status = document.getElementById("status").value;

    if (title == "" || genre == "" || year == "") {
        alert("Please fill all fields");
        return;
    }

    if (editIndex == -1) {

        movies.push({
            id: movies.length + 1,
            title: title,
            genre: genre,
            year: year,
            status: status
        });

    } else {
        movies[editIndex].title = title;
        movies[editIndex].genre = genre;
        movies[editIndex].year = year;
        movies[editIndex].status = status;

        editIndex = -1;

        document.getElementById("heading").innerText = "Add Movie";
        document.getElementById("addButton").innerText = "Add Movie";
        document.getElementById("cancelButton").style.display = "none";
    }

    clearForm();
    showMovies();
}

function showMovies() {

    let list = document.getElementById("movieList");
    let search = document.getElementById("search").value.toLowerCase();
    let filter = document.getElementById("filter").value;

    list.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {

        let movie = movies[i];

        if (!movie.title.toLowerCase().includes(search)) {
            continue;
        }

        if (filter != "All" && movie.status != filter) {
            continue;
        }

        list.innerHTML += `
            <div class="movie">
                <div>
                    <h3>${movie.title}</h3>
                    <p>${movie.genre} · ${movie.year}</p>
                </div>
                <div>
                    <span class="status">${movie.status}</span>
                    <button class="edit"
                        onclick="editMovie(${i})">
                        Edit
                    </button>
                    <button class="delete"
                        onclick="deleteMovie(${i})">
                        Delete
                    </button>
                </div>
            </div>
        `;
    }
}

function editMovie(index) {

    let movie = movies[index];

    document.getElementById("title").value = movie.title;
    document.getElementById("genre").value = movie.genre;
    document.getElementById("year").value = movie.year;
    document.getElementById("status").value = movie.status;

    editIndex = index;

    document.getElementById("heading").innerText = "Update Movie";
    document.getElementById("addButton").innerText = "Update Movie";
    document.getElementById("cancelButton").style.display = "inline";
}

function deleteMovie(index) {

    if (confirm("Delete this movie?")) {
        movies.splice(index, 1);
        showMovies();
    }
}

function cancelEdit() {

    editIndex = -1;

    clearForm();

    document.getElementById("heading").innerText = "Add Movie";
    document.getElementById("addButton").innerText = "Add Movie";
    document.getElementById("cancelButton").style.display = "none";
}

function clearForm() {

    document.getElementById("title").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("year").value = "";
    document.getElementById("status").value = "Planned";
}

showMovies();