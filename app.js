
const apikey = "2b4103988bc4830e193b5595599a5af0";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weathericon");

async function checkweather(city) {
  try {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    
    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();

      // Update UI with weather data
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      // Set appropriate weather icon
      if (data.weather[0].main.toLowerCase() === "clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main.toLowerCase() === "clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main.toLowerCase() === "rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main.toLowerCase() === "mist") {
        weatherIcon.src = "images/mist.png";
      } else if (data.weather[0].main.toLowerCase() === "drizzle") {
        weatherIcon.src = "images/drizzle.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchbox.value.trim();
  if (city) {
    checkweather(city);
  }
});



