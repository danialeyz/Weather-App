// DOM elements
const cityNameInput = document.querySelector("#city-name");
const searchButton = document.querySelector("#search-button");
const cityName = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
const weatherStatus = document.querySelector(".weather-status");
const weatherContent = document.querySelector(".weather");
const errorStatus = document.querySelector(".error");

// API
// API
const apiKey = "f7ee9f89bce70aee75c2392eace6df7c";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Helper: show / hide states
function showWeather() {
  weatherContent.classList.remove("hidden");
  errorStatus.classList.remove("visible");
  errorStatus.textContent = "";
}

function showError(message) {
  weatherContent.classList.add("hidden");
  errorStatus.textContent = message;
  errorStatus.classList.add("visible");
}

function startLoading() {
  weatherContent.classList.add("loading");
}

function stopLoading() {
  weatherContent.classList.remove("loading");
}

// Getting data from API and placing that in DOM
async function getWeather(city = "Tehran") {
  const trimmedCity = city.trim();

  // avoid empty request
  if (!trimmedCity) {
    cityNameInput.classList.add("shake");
    setTimeout(() => cityNameInput.classList.remove("shake"), 400);
    return;
  }

  try {
    startLoading();
    showWeather(); // reset previous error state

    const response = await fetch(
      apiUrl + encodeURIComponent(trimmedCity) + `&appid=${apiKey}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        showError("City not found. Please check the spelling.");
      } else {
        showError("Something went wrong. Please try again.");
      }
      return;
    }

    const data = await response.json();
    const dataStatus = data.weather[0].main;

    // checking and changing weather status Icon
    if (dataStatus === "Clouds") {
      weatherIcon.src = "src/images/clouds.png";
    } else if (dataStatus === "Clear") {
      weatherIcon.src = "src/images/clear.png";
    } else if (dataStatus === "Rain") {
      weatherIcon.src = "src/images/rain.png";
    } else if (dataStatus === "Drizzle") {
      weatherIcon.src = "src/images/drizzle.png";
    } else if (dataStatus === "Snow") {
      weatherIcon.src = "src/images/snow.png";
    } else if (dataStatus === "Mist") {
      weatherIcon.src = "src/images/mist.png";
    } else {
      // default icon if the status is something else
      weatherIcon.src = "src/images/clouds.png";
    }

    // adding data to DOM
    cityName.textContent = data.name;
    weatherStatus.textContent = dataStatus;
    temp.textContent = Math.round(data.main.temp) + "°C";
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = Math.round(data.wind.speed); // km/h text is in HTML

    // clear input
    cityNameInput.value = "";
    showWeather();
  } catch (err) {
    console.error(err);
    showError("Network error. Please check your connection.");
  } finally {
    stopLoading();
  }
}

// Event listeners

// default load
window.addEventListener("DOMContentLoaded", () => {
  getWeather("Tehran"); // you can change the default city if you want
});

// button click
searchButton.addEventListener("click", () => {
  getWeather(cityNameInput.value);
});

// Enter key in input
cityNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeather(cityNameInput.value);
  }
});
