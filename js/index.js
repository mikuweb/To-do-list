//-----------------------
// Selector
//-----------------------
const taskAddBtn = document.getElementById("btn__addTask");
const taskList = document.getElementById("lists");
const taskInput = document.getElementById("input");
const filterOption = document.querySelector(".filter__todo");

//-----------------------
// function Question: how to organize?
//-----------------------

//Delete task
const removeTask = (removeButton) => {
  const targetTask = removeButton.closest("li");
  targetTask.classList.add("fall"); //Question: how to add classList?
  taskList.removeChild(targetTask);
};

//Add task & delete button
const addTask = (task) => {
  //Create LI
  const listItem = document.createElement("li");
  listItem.innerText = task;
  listItem.className = "listItem";
  taskList.appendChild(listItem);

  //Create remove× button
  const removeButton = document.createElement("button");
  removeButton.className = "removeButton";
  removeButton.innerText = ""; //×
  listItem.append(removeButton);
  removeButton.addEventListener("click", () => removeTask(removeButton));
  removeButton.addEventListener("click", countRemainingTasks()); //Question 1/2
};

//Select filter
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

//Put to do items into LocalStorage
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

//Show TO DO ITEMS after loaded //Question
// function getTodos() {
//   console.log("Reloded!");

//   let todos;
//   if (localStorage.getItem("todos") === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }
//   //
//   todos.forEach(function (listItem) {
//     //Create LI
//     const listItem = document.createElement("li");
//     listItem.innerText = listItem;
//     listItem.className = "listItem";
//     taskList.appendChild(listItem);

//     //Create remove× button
//     const removeButton = document.createElement("button");
//     removeButton.className = "removeButton";
//     removeButton.innerText = ""; //×
//     listItem.append(removeButton);
//     removeButton.addEventListener("click", () => removeTask(removeButton));

//     addTask(listItem);
//   });
// }

// Count the number of to do https://stackoverflow.com/questions/52991261/how-to-count-the-number-of-checked-elements-and-the-number-of-total-elements-in
// Question :not working when it's removed
function countRemainingTasks() {
  let totalTasks = document.querySelector("#lists").children.length;
  let checkedTasks = document.querySelectorAll(".checked").length;
  let remainingTasks = totalTasks - checkedTasks;
  console.log(totalTasks, checkedTasks, remainingTasks);
  let countElement = document.querySelector(".number__count");
  countElement.innerText = remainingTasks;
}

//-----------------------
// EventListener
//-----------------------

//When it's loaded save to do items in LocalStorage //Question
// document.addEventListener("DOMContentLoaded", getTodos);

//Add task when you click "Add" button🔥
taskAddBtn.addEventListener("click", (e) => {
  const task = "✓  " + taskInput.value;
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
    const task = "✓  " + taskInput.value;
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

// removeButton.addEventListener("clicked", countRemainingTasks()); //Question 2/2
