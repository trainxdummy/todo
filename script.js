let todos = [];

let editIndex = -1;

// Get elements

let form = document.getElementById("todoForm");

let taskInput = document.getElementById("taskInput");

let categoryInput = document.getElementById("categoryInput");

let priorityInput = document.getElementById("priorityInput");

let statusInput = document.getElementById("statusInput");

let taskList = document.getElementById("taskList");

let searchInput = document.getElementById("searchInput");

let filterInput = document.getElementById("filterInput");

let addButton = document.getElementById("addButton");

let cancelButton = document.getElementById("cancelButton");

let error = document.getElementById("error");

// CREATE

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let task = taskInput.value.trim();

  let category = categoryInput.value.trim();

  let priority = priorityInput.value;

  let status = statusInput.value;

  // Validation

  if (task == "") {
    error.innerText = "Please enter a task.";

    return;
  }

  error.innerText = "";

  // UPDATE

  if (editIndex != -1) {
    todos[editIndex].task = task;

    todos[editIndex].category = category;

    todos[editIndex].priority = priority;

    todos[editIndex].status = status;

    editIndex = -1;

    addButton.innerText = "Add Task";

    cancelButton.style.display = "none";
  }

  // CREATE
  else {
    let newTodo = {
      task: task,

      category: category || "General",

      priority: priority,

      status: status,
    };

    todos.push(newTodo);
  }

  form.reset();

  displayTodos();
});

// READ / DISPLAY

function displayTodos() {
  taskList.innerHTML = "";

  let searchText = searchInput.value.toLowerCase();

  let filter = filterInput.value;

  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];

    // Search

    if (!todo.task.toLowerCase().includes(searchText)) {
      continue;
    }

    // Filter

    if (filter != "All" && todo.status != filter) {
      continue;
    }

    let div = document.createElement("div");

    div.className = "task";

    let statusClass = todo.status == "Completed" ? "completed" : "pending";

    div.innerHTML = `

            <div>

                <div class="task-name">
                    ${todo.task}
                </div>

                <div class="task-category">
                    ${todo.category} · ${todo.priority}
                </div>

            </div>


            <div class="task-right">

                <span class="status ${statusClass}">
                    ${todo.status}
                </span>


                <div>

                    <button
                        class="edit-button"
                        onclick="editTodo(${i})">
                        Edit
                    </button>

                    <button
                        class="delete-button"
                        onclick="deleteTodo(${i})">
                        Delete
                    </button>

                </div>

            </div>
        `;

    taskList.appendChild(div);
  }

  if (taskList.innerHTML == "") {
    taskList.innerHTML = "<p class='no-task'>No tasks found.</p>";
  }
}

// EDIT / UPDATE

function editTodo(index) {
  let todo = todos[index];

  taskInput.value = todo.task;

  categoryInput.value = todo.category;

  priorityInput.value = todo.priority;

  statusInput.value = todo.status;

  editIndex = index;

  addButton.innerText = "Update Task";

  cancelButton.style.display = "inline-block";

  taskInput.focus();
}

// CANCEL

cancelButton.addEventListener("click", function () {
  form.reset();

  editIndex = -1;

  addButton.innerText = "Add Task";

  cancelButton.style.display = "none";

  error.innerText = "";
});

// DELETE

function deleteTodo(index) {
  todos.splice(index, 1);

  displayTodos();
}

// SEARCH

searchInput.addEventListener("input", function () {
  displayTodos();
});

// FILTER

filterInput.addEventListener("change", function () {
  displayTodos();
});
