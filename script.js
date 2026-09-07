let todos = [];
let editIndex = -1;

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

// Add Task
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let task = taskInput.value.trim();
  let category = categoryInput.value.trim();
  let priority = priorityInput.value;
  let status = statusInput.value;

  if (task === "") {
    error.innerText = "Please enter a task.";
    return;
  }

  error.innerText = "";

  if (editIndex === -1) {
    let todo = {
      task: task,
      category: category || "General",
      priority: priority,
      status: status,
    };

    todos.push(todo);
  } else {
    todos[editIndex].task = task;
    todos[editIndex].category = category || "General";
    todos[editIndex].priority = priority;
    todos[editIndex].status = status;

    editIndex = -1;

    addButton.innerText = "Add Task";
    cancelButton.style.display = "none";
  }

  form.reset();
  showTodos();
});

// Show Tasks
function showTodos() {
  taskList.innerHTML = "";

  let search = searchInput.value.toLowerCase();
  let filter = filterInput.value;

  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];

    if (!todo.task.toLowerCase().includes(search)) {
      continue;
    }

    if (filter !== "All" && todo.status !== filter) {
      continue;
    }

    let div = document.createElement("div");
    div.className = "task";

    let statusClass = "pending";

    if (todo.status === "Completed") {
      statusClass = "completed";
    }

    div.innerHTML = `
            <div>
                <div class="task-name">${todo.task}</div>

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

  if (taskList.children.length === 0) {
    taskList.innerHTML = "<p class='no-task'>No tasks found.</p>";
  }
}

// Edit Task
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

// Cancel
cancelButton.addEventListener("click", function () {
  form.reset();

  editIndex = -1;

  addButton.innerText = "Add Task";
  cancelButton.style.display = "none";

  error.innerText = "";
});

// Delete
function deleteTodo(index) {
  todos.splice(index, 1);

  showTodos();
}

// Search
searchInput.addEventListener("input", function () {
  showTodos();
});

// Filter
filterInput.addEventListener("change", function () {
  showTodos();
});
