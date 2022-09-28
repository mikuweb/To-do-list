const taskAddBtn = document.getElementById("btn__addTask");
const taskList = document.getElementById("lists");
const taskInput = document.getElementById("input");

//Delete task
const removeTask = (removeButton) => {
  const targetTask = removeButton.closest("li");
  taskList.removeChild(targetTask);
};

//Add task & delete button
const addTask = (task) => {
  const listItem = document.createElement("li");
  listItem.className = "list";
  const removeButton = document.createElement("button");
  removeButton.className = "removeButton";

  removeButton.innerText = "";
  removeButton.addEventListener("click", () => removeTask(removeButton));

  listItem.innerText = task;

  listItem.append(removeButton);
  taskList.appendChild(listItem);
};

//Event FIRE🔥🔥
taskAddBtn.addEventListener("click", (e) => {
  const task = "・ " + taskInput.value;
  addTask(task);
  taskInput.value = "";
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); //Prevent from reloading
    const task = "・ " + taskInput.value;
    addTask(task);
    taskInput.value = "";
  }
});

//Add strike through
let strikethroughTrigger = document.querySelector("#lists");
strikethroughTrigger.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("is-active");
    //   event.target.style.textDecoration = 'line-through';
  }
});

