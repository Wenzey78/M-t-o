const API_KEY = "766d710c2913fdc30e7e5a7866b42e60";
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");
const cityInput = document.getElementById("cityInput");
const weatherForm = document.getElementById("weatherForm");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    resultDiv.innerHTML = "Veuillez entrer un nom de ville.";
    resultDiv.className = "";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`
    );
    const data = await response.json();

    if (data.cod === "404" || data.cod === 404) {
      resultDiv.innerHTML = "Ville introuvable.";
      resultDiv.className = "";
      return;
    }

    const icon = data.weather[0].icon;
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const name = data.name;

    let tempClass = "";
    if (temp < 10) {
      tempClass = "cold";
    } else if (temp <= 25) {
      tempClass = "warm";
    } else {
      tempClass = "hot";
    }

    resultDiv.className = tempClass;

    resultDiv.innerHTML = `
      <h2>${name}</h2>
      <p>Température : ${temp}°C</p>
      <p>Météo : ${description}</p>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Icône météo">
    `;

    localStorage.setItem("lastCity", city);
  } catch (error) {
    resultDiv.innerHTML = "Erreur lors de la récupération des données météo.";
    resultDiv.className = "";
    console.error(error);
  }
});

window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    cityInput.value = lastCity;
    searchBtn.click(); // Ou weatherForm.dispatchEvent(new Event("submit"));
  }
});
