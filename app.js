const STORAGE_KEY = "offline-todo-items";
const FILTER_STORAGE_KEY = "offline-todo-filter";
const VALID_FILTERS = ["all", "active", "completed"];

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll("[data-filter]");

let todos = loadTodos();
let currentFilter = loadFilterPreference();

// 從 localStorage 讀取資料，若資料損壞則回到空清單。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch (error) {
    return [];
  }
}

// 將目前的待辦清單保存到瀏覽器。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 讀取篩選偏好，遇到非預期值時安全回到全部。
function loadFilterPreference() {
  const savedFilter = localStorage.getItem(FILTER_STORAGE_KEY);
  if (VALID_FILTERS.includes(savedFilter)) {
    return savedFilter;
  }

  localStorage.setItem(FILTER_STORAGE_KEY, "all");
  return "all";
}

function getVisibleTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

function getEmptyMessage() {
  if (todos.length === 0) {
    return "還沒有任何待辦事項,新增一個吧!";
  }

  return currentFilter === "active"
    ? "目前沒有未完成的事項,項目只是被目前的篩選條件過濾掉了。"
    : "目前沒有已完成的事項,項目只是被目前的篩選條件過濾掉了。";
}

// 重新繪製清單並更新未完成數量。
function renderTodos() {
  todoList.replaceChildren();
  const visibleTodos = getVisibleTodos();
  emptyState.textContent = getEmptyMessage();
  emptyState.hidden = visibleTodos.length > 0;

  visibleTodos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    listItem.classList.toggle("completed", todo.completed);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為完成`);
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    listItem.append(checkbox, text, deleteButton);
    todoList.append(listItem);
  });

  const unfinishedCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  remainingCount.textContent = `未完成:${unfinishedCount} 項`;
  clearCompletedButton.disabled = completedCount === 0;
}

function setFilter(filter) {
  if (!VALID_FILTERS.includes(filter)) {
    filter = "all";
  }

  currentFilter = filter;
  localStorage.setItem(FILTER_STORAGE_KEY, currentFilter);
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderTodos();
}

function addTodo(text) {
  todos.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) => (
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

// 確認後一次清除所有已完成項目，並同步保存資料。
function clearCompletedTodos() {
  if (!todos.some((todo) => todo.completed)) {
    return;
  }

  if (!window.confirm("確定要清除所有已完成的待辦事項嗎？")) {
    return;
  }

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  addTodo(text);
  todoInput.value = "";
  todoInput.focus();
});

clearCompletedButton.addEventListener("click", clearCompletedTodos);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

setFilter(currentFilter);