// Task lists
const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");

// Add Task Button
document.getElementById("add-task-btn").addEventListener("click", () => {
  const title = document.getElementById("task-title").value.trim();
  const desc = document.getElementById("task-desc").value.trim();

  if (!title || !desc) {
    alert("Please fill out both fields!");
    return;
  }

  addTaskToPending(title, desc);
  clearInputs();
});

// Clear input fields
function clearInputs() {
  document.getElementById("task-title").value = "";
  document.getElementById("task-desc").value = "";
}

// Add task to Pending List
function addTaskToPending(title, desc) {
  const task = createTaskItem(title, desc, false);
  pendingList.appendChild(task);
}

// Add task to Completed List
function addTaskToCompleted(title, desc) {
  const task = createTaskItem(title, desc, true);
  completedList.appendChild(task);
}

// Create task item
function createTaskItem(title, desc, isCompleted) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  // Task content
  const content = document.createElement("div");
  content.innerHTML = `<strong>${title}</strong><br>${desc}`;
  taskItem.appendChild(content);

  // Action buttons
  const actions = document.createElement("div");
  actions.className = "task-actions";

  if (!isCompleted) {
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.className = "complete-btn";
    completeBtn.addEventListener("click", () => {
      taskItem.remove();
      addTaskToCompleted(title, desc);
    });
    actions.appendChild(completeBtn);
  }

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", () => {
    const newTitle = prompt("Edit Task Title:", title) || title;
    const newDesc = prompt("Edit Task Description:", desc) || desc;
    taskItem.remove();
    if (isCompleted) {
      addTaskToCompleted(newTitle, newDesc);
    } else {
      addTaskToPending(newTitle, newDesc);
    }
  });
  actions.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => taskItem.remove());
  actions.appendChild(deleteBtn);

  taskItem.appendChild(actions);

  return taskItem;
}
