//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");

//Functions
const addTodo = (event) => {
  event.preventDefault();

  //create wrapper div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create todo li
  const newTodo = document.createElement("li");
  newTodo.innerText = `${todoInput.value}`;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //save todos to Local Storage
  saveLocalTodos(todoInput.value);

  //check button
  const completedButton = document.createElement("button");
  completedButton.innerText = "DONE";
  completedButton.classList.add("check-btn");
  todoDiv.appendChild(completedButton);

  //delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "DELETE";
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  //append to list
  todoList.appendChild(todoDiv);

  //clear todo input value
  todoInput.value = "";
};

const deleteCheck = (event) => {
  const item = event.target;
  //delete todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;

    removeLocalTodos(todo);
    todo.remove();
    //complete toggle
  } else if (item.classList[0] === "check-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
};

// filter todos
const filterTodo = (e) => {
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

// Store todos in local storage
const saveLocalTodos = (todo) => {
  //check for todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo); // push param todo to the todos array list
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  //check for todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    //create wrapper div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create todo li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //check button
    const completedButton = document.createElement("button");
    completedButton.innerText = "DONE";
    completedButton.classList.add("check-btn");
    todoDiv.appendChild(completedButton);

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "DELETE";
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //append to list
    todoList.appendChild(todoDiv);
  });
};

const removeLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todos.indexOf(todo.children[0].innerText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Events
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("change", filterTodo);
