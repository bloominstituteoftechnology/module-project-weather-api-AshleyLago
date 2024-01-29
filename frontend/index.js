async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here

// Task 1
  document.querySelector("#weatherWidget").style.display = "none";
// Task 1

// Task 2 & 3
  document.querySelector("#citySelect").addEventListener("change", async evt => {
    try {
      evt.target.setAttribute("disabled", "disabled");
      document.querySelector("#weatherWidget").style.display = "none";
      document.querySelector(".info").textContent = "Fetching weather data...";

// Task 4
      let city = evt.target.value;
      let url = `http://localhost:3003/api/weather?city=${city}`;
      let re = await axios.get(url);

// Task 5
      document.querySelector("#weatherWidget").style.display = "block";
      document.querySelector(".info").textContent = "";
      evt.target.removeAttribute("disabled");

      let { data } = re;

      document.querySelector("#apparentTemp div:nth-child(2)").textContent = `${data.current.apparent_temperature}°`;
      document.querySelector("#todayDescription").textContent = descriptions.find(d => d[0] === data.current.weather_description)[1];
      document.querySelector("#todayStats div:nth-child(1)").textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`;
      document.querySelector("#todayStats div:nth-child(2)").textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`;
      document.querySelector("#todayStats div:nth-child(3)").textContent = `Humidity: ${data.current.humidity}%`;
      document.querySelector("#todayStats div:nth-child(4)").textContent = `Wind: ${data.current.wind_speed}m/s`;

      data.forecast.daily.forEach((day, idx) => {
        let crd = document.querySelectorAll(".next-day")[idx];
        let wDay = crd.children[0];
        let app = crd.children[1];
        let minMax = crd.children[2];
        let pre = crd.children[3];

        wDay.textContent = getWeekDay(day.date);
        app.textContent = descriptions.find(d => d[0] === day.weather_description) [1];
        minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`
        pre.textContent = `Precipitation: ${day.precipitation_probability * 100}%`;
      });

      document.querySelector("#location").firstElementChild.textContent = data.location.city;
// Task 5
    }
    catch (err) {
      console.log("Promise has been rejected. "+err.message)
    }
// Task 4
  });
// Task 2 & 3

// Task 4
function getWeekDay(date) {
  let day = date.split("-");
  let dayW = "";
  if (day[2] === "25") {
    dayW = "Thursday";
  }
  else if (day[2] === "26") {
    dayW = "Friday";
  }
  else if (day[2] === "27") {
    dayW = "Saturday";
  }
  return dayW;
}
// Task 4

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
