const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "PENDING";

let PENDING = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = PENDING.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  PENDING = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(PENDING));
}


function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = PENDING.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  PENDING.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}


const plusBtn = document.querySelector(".plus-btn");
const jsInput = document.querySelector(".js-input");
let click = false;
plusBtn.addEventListener("click", function() {
  if (click == false) {
    plusBtn.classList.add("on");
    plusBtn.classList.remove("off");
    jsInput.classList.toggle("active");
    click = true;
  } else {
    plusBtn.classList.remove("on");
    plusBtn.classList.add("off");
    jsInput.classList.toggle("active");
    click = false;
  }
})

const clearAll = document.querySelector(".clear");
clearAll.addEventListener("click", clearEverything);
function clearEverything() {
  if (confirm("모든 데이터가 초기화됩니다.") == true) {
    localStorage.clear();
    window.location.reload();
  } else {
    return;
  }
}

init();
