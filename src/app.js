// Main variables
const cityNameSearch = document.querySelector("#city-name");
const serachButton = document.querySelector("#sreach-button");
const cityName = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
const weatherStatus = document.querySelector(".weather-status");
const weatherContent = document.querySelector(".weather");
const errorStatus = document.querySelector(".error");

// API
const apiKey = "f7ee9f89bce70aee75c2392eace6df7c";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Getting data from API and placing that in DOM
async function getWeather(city = "Tehran") {
  let response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // checking if request status is succesfull or not
  if (response.status === 200) {
    let data = await response.json();
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
    }

    // adding data to DOM
    cityName.innerHTML = data.name;
    weatherStatus.innerHTML = dataStatus;
    temp.innerHTML = Math.round(data.main.temp) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = Math.round(data.wind.speed);

    // getting city name input empty
    cityNameSearch.value = "";
  } else {
    weatherContent.style.display = "none";
    errorStatus.style.display = "block";
  }
}

// Event listners

// default
window.addEventListener("DOMContentLoaded", () => {
  getWeather("Tehran"); // I will add the user live location feature
});

// after search
serachButton.addEventListener("click", () => {
  getWeather(cityNameSearch.value);
});
