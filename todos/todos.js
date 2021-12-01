const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

const LOCAL_STORAGE_KEY = "todo";
let LOCAL_STORAGE_ARRAY = [];

//functions

window.onload = () => {
  console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))); //get them back
  const storageArr = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  storageArr.forEach((todoText) => {
    CreateNewTodo("fromOnloadFunc", todoText);
  });
};

const CreateNewTodo = (fromWho, todoText) => {
  let ValueFromInputOrStorage;
  if (fromWho === "fromOnloadFunc") {
    ValueFromInputOrStorage = todoText;
  } else if ("fromAddTodoBtn") {
    ValueFromInputOrStorage = todoInput.value;
  }
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = `
  <li>${ValueFromInputOrStorage} </li>
  <span><i class="far fa-trash-alt"></i></span>
  <span><i class="far fa-square check-icon"></i></span>`;
  todoDiv.innerHTML = newTodo;
  todoList.appendChild(todoDiv);
};

const addTodo = (e) => {
  e.preventDefault();
  if (!todoInput.value) return;
  CreateNewTodo("fromAddTodoBtn");
  console.log("before", JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  if (JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) !== [])
    LOCAL_STORAGE_ARRAY = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  LOCAL_STORAGE_ARRAY.push(todoInput.value);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(LOCAL_STORAGE_ARRAY));
  console.log("after", JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  todoInput.value = "";
};

const checkRemove = (e) => {
  const classList = [...e.target.classList];
  const item = e.target;
  if (item.tagName !== "I") return;
  if (classList.includes("fa-trash-alt")) {
    item.parentElement.parentElement.remove();
    return;
  }
  const todo = item.parentElement.parentElement;
  todo.classList.toggle("completed");
  if ([...todo.classList].includes("completed")) {
    e.target.classList.add("fa-check-square");
    e.target.classList.remove("fa-square");
  } else {
    e.target.classList.add("fa-square");
    e.target.classList.remove("fa-check-square");
  }

  //fa-square
};
const filterTodos = (e) => {
  const todos = [...todoList.childNodes];
  todos.forEach((todo) => {
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
      case "unCompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

// listener

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterTodos);
