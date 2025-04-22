// script.js

const apiKey = "a9588d750f5552cc13de73cea9dbb746";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    errorMsg.textContent = "Please enter a city name.";
    weatherResult.innerHTML = "";
    return;
  }

  errorMsg.textContent = ""; // Clear previous error
  getWeather(city);
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found.");
    }

    const data = await response.json();

    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherResult.innerHTML = `
      <h2>${city}</h2>
      <img src="${iconUrl}" alt="${description}" />
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <p><strong>Condition:</strong> ${description}</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = "";
    errorMsg.textContent = error.message;
  }
}
