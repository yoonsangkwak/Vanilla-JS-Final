const API_KEY = "39b21a1bb381628bfa14045db5d8ea84";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");
const weatherMin = document.querySelector(".weather-min");
const weatherMax = document.querySelector(".weather-max");
const weatherimage = document.getElementById("weather-image");
const weatherWind = document.querySelector(".weather-wind");
const weatherHumidity = document.querySelector(".weather-humidity");


function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json()
    })
    .then(function (json) {
        const weatherImg = json.weather[0].icon;
        const temperature = json.main.temp;
        const place = json.name;
        const tempMin = json.main.temp_min;
        const tempMax = json.main.temp_max;
        const windSpeed = json.wind.speed;
        const humidity = json.main.humidity;
        let imgURL = "http://openweathermap.org/img/w/" + weatherImg + ".png";
        weatherimage.src = imgURL;
        weather.innerText = temperature + "℃ at " + place;
        weatherMin.innerText = "최저 온도: " + tempMin + "℃";
        weatherMax.innerText = "최고 온도: " + tempMax + "℃";
        weatherWind.innerText = "풍속: " + windSpeed + "m/s";
        weatherHumidity.innerText = "습도: " + humidity +"%";
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const  coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

const weatherDiv = document.querySelector(".weather-click");
const weatherIcon = document.querySelector(".weather-icon");
function weatherMore() {
    weatherIcon.classList.toggle("active");
    weatherMin.classList.toggle("active");
    weatherMax.classList.toggle("active");
    weatherWind.classList.toggle("active");
    weatherHumidity.classList.toggle("active");
}
weatherDiv.addEventListener("click", weatherMore);

function init() {
    loadCoords();
}

init();