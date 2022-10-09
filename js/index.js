//-----------------------
// Element selector
//-----------------------
const taskAddBtn = document.getElementById("btn__addTask");
const taskList = document.getElementById("lists");
const taskInput = document.getElementById("input");
const filterOption = document.querySelector(".filter__todo");

//-----------------------
// function Question: how to organize?
//-----------------------

// Delete task
const removeTask = (removeButton) => {
  const targetTask = removeButton.closest("li");
  targetTask.classList.add("fall");

  //wait 500ms
  setTimeout(() => {
    taskList.removeChild(targetTask);
    countRemainingTasks();
  }, 500);
};

// Add task & delete button
function addTask(task) {
  //Create LI
  const listItem = document.createElement("li");
  listItem.innerText = task;
  listItem.className = "listItem";
  taskList.appendChild(listItem);

  // Create remove"X" button
  const removeButton = document.createElement("button");
  removeButton.className = "removeButton";
  removeButton.innerText = ""; //×
  listItem.append(removeButton);
  removeButton.addEventListener("click", () => removeTask(removeButton));
  removeButton.addEventListener("click", removeLocalTodos);
}

// Select filter
function filterTodo(e) {
  const todos = taskList.childNodes; //ひとつひとつのタスク
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "checked":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "unchecked":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      default:
        break;
    }
  });
}
filterOption.addEventListener("click", filterTodo);

// Put to do items into LocalStorage
function saveLocalTodos(listItem) {
  //Check if there is already any data in the Local storage?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(listItem);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Show TO DO ITEMS after loaded
function getTodos() {
  //Check--Do I already have thing in LocalStorage?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => addTask(todo));
  // (↓These are working same way)
  // todos.forEach(addTask);
  // todos.forEach(function (todo) {
  //   addTask(todo);
  // });
}

// Count the number of to do
function countRemainingTasks() {
  let totalTasks = document.querySelector("#lists").children.length;
  let checkedTasks = document.querySelectorAll(".checked").length;
  let remainingTasks = totalTasks - checkedTasks;
  let countElement = document.querySelector(".number__count");
  countElement.innerText = remainingTasks;
}

// Remove from LocalStorage
function removeLocalTodos(e) {
  //Check--Do I already have thing in LocalStorage?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todos);
  console.log(e.target.parentElement.innerText);
  const todoText = e.target.parentElement.innerText;
  console.log(todos.indexOf(todoText)); //配列の順序の数字
  const deleteIndex = todos.indexOf(todoText);
  const todosCopy = [...todos];
  todos.splice(deleteIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//-----------------------
// EventListener
//-----------------------

//When it's loaded save to do items in LocalStorage🔥
document.addEventListener("DOMContentLoaded", getTodos);

//Add task when you click "Add" button🔥
taskAddBtn.addEventListener("click", (e) => {
  const task = taskInput.value;
  addTask(task);

  //Add to do list to LocalStorage
  saveLocalTodos(taskInput.value);

  //Count tasks
  countRemainingTasks();

  //Clear input
  taskInput.value = "";
});
//Add task when you press "Enter" key🔥
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); //Prevent from reloading
    const task = taskInput.value;
    addTask(task);

    //Add to do list to LocalStorage
    saveLocalTodos(taskInput.value);

    //Count tasks
    countRemainingTasks();

    //Clear input
    taskInput.value = "";
  }
});

//Add strike through🔥
let strikethroughTrigger = document.querySelector("#lists");
strikethroughTrigger.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    //   event.target.style.textDecoration = 'line-through';

    //Count tasks
    countRemainingTasks();
  }
});
