// ======================================
// Weather App using WeatherAPI
// ======================================

// Your WeatherAPI Key
const API_KEY = "fa64e0fc2d5b437293590947260207";

// HTML Elements
const form = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");

const temperature = document.querySelector(".temperature");
const city = document.querySelector(".city");
const dateTime = document.querySelector(".date-time");
const condition = document.querySelector(".condition");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");

// Default City
let currentCity = "Peshawar";

// =========================
// Get Weather
// =========================

async function getWeather(cityName) {

    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(cityName)}&aqi=no`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        // API Error
        if (data.error) {
            alert(data.error.message);
            return;
        }

        updateUI(data);

    } catch (error) {

        console.error(error);

        alert("Unable to connect to Weather API.");

    }

}

// =========================
// Update UI
// =========================

function updateUI(data) {

    temperature.innerText = `${Math.round(data.current.temp_c)}°C`;

    city.innerText = data.location.name;

    condition.innerText = data.current.condition.text;

    humidity.innerText = `${data.current.humidity}%`;

    wind.innerText = `${data.current.wind_kph} km/h`;

    weatherIcon.src = "https:" + data.current.condition.icon;

    weatherIcon.alt = data.current.condition.text;

    const date = new Date(data.location.localtime);

    const options = {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric",

        hour: "2-digit",

        minute: "2-digit"

    };

    dateTime.innerText = date.toLocaleString("en-US", options);

}

// =========================
// Search
// =========================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const cityName = searchInput.value.trim();

    if (cityName === "") {

        alert("Please enter a city name.");

        return;

    }
    console.log(temperature);
console.log(city);
console.log(dateTime);
console.log(condition);
console.log(humidity);
console.log(wind);
console.log(weatherIcon);

    getWeather(cityName);

    searchInput.value = "";

});

// =========================
// Load Default Weather
// =========================

getWeather(currentCity);