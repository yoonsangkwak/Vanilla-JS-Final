const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    const date = new Date();
    const hour = date.getHours();
    let hi = "";
    if (hour <= 12 && hour > 6) {
        hi = "Good Morning!";
    } else if (hour <= 18 && hour > 12) {
        hi = "Good Afternoon!";
    } else if (hour <= 23 && hour > 18) {
        hi = "Good Evening!";
    } else if (hour >= 0 && hour <= 6) {
        hi = "Good Night!";
    }
    greeting.innerHTML = hi + "<br>" + text;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();

