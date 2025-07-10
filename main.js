const locationInput = document.getElementById("location-input");
const key = "HY7CDFGCMZD8HYD2K3PGJX8VQ";

// Current Forecast Data Elements
const currentForecastParent = document.getElementById(
  "current-forecast-parent"
);
const currLocation = document.createElement("h1");
const currConditions = document.createElement("h3");
const currTemp = document.createElement("p");
currTemp.style.fontSize = "70px";
currTemp.style.fontWeight = "bolder";
const currRealFeel = document.createElement("p");
const currTempMaxMin = document.createElement("p");
currentForecastParent.append(
  currLocation,
  currConditions,
  currTemp,
  currRealFeel,
  currTempMaxMin
);

// Hourly Forecast Data Elements
const hourlyForecastParent = document.getElementById("hourly-forecast-parent");
const hourlyForecastHeader = document.getElementById("hourly-forecast-header");
const hourlyForecastData = document.getElementById("hourly-forecast-data");
hourlyForecastParent.append(hourlyForecastHeader, hourlyForecastData);

async function fetchWeatherData() {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput.value}?key=${key}&iconSet=icons1`
    );
    const data = await response.json();
    console.log(data);

    // Render and format current weather data
    currLocation.innerHTML = data.resolvedAddress;
    currConditions.innerHTML = data.currentConditions.conditions;
    currTemp.innerHTML = data.currentConditions.temp + "&deg;";
    currRealFeel.innerHTML =
      "Feels like " + data.currentConditions.feelslike + "&deg;";
    currTempMaxMin.innerHTML =
      "High " +
      data.days[0].tempmax +
      "&deg; &#183; Low " +
      data.days[0].tempmin +
      "&deg;";

    // Loop through each hour of the day
    data.days[0].hours.forEach((el) => {
      // If hour is less than 12, set to AM, else, set to PM.
      let hour = parseInt(el.datetime.substring(0, 2));
      let meridiem;
      if (hour <= 11) {
        meridiem = "AM";
      } else {
        meridiem = "PM";
      }

      // Loop through future hours of the day
      if (data.currentConditions.datetimeEpoch < el.datetimeEpoch) {
        const hourlyDiv = document.createElement("div");
        const hourlyTemp = document.createElement("p");
        const hourlyIcon = document.createElement("img");
        const hourlyHour = document.createElement("p");

        hourlyForecastParent.style.display = "flex";
        hourlyForecastHeader.innerHTML =
          '<i class="fa-regular fa-clock"></i>' + " Hourly forecast";
        hourlyDiv.id = "hourly-div";
        hourlyIcon.src = `/icons/${el.icon}.svg`;
        hourlyIcon.alt = el.icon;
        // If the hour is 1pm or greater, subtract 12 from the hour to change to 12 hour clock format.
        if (hour >= 13) {
          hour -= 12;
          hourlyTemp.innerHTML = el.temp + "&deg;";
          hourlyHour.innerHTML = hour + meridiem;
        } else {
          hourlyTemp.innerHTML = el.temp + "&deg;";
          hourlyHour.innerHTML = hour + meridiem;
        }

        hourlyDiv.append(hourlyTemp, hourlyIcon, hourlyHour);
        hourlyForecastData.appendChild(hourlyDiv);
      }
    });

    locationInput.value = "";
  } catch (error) {
    console.error("Could not fetch resources:", error);
  }
}

// If user presses the ENTER key, fetch the weather.
locationInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchWeatherData();
    event.preventDefault();
  }
});

// Display the current forcast as well as the forecast for the rest of the day, per hour.

// Parent Container
// // User Input
// // Current conditions
// // // Conditions
// // // Temperature
// // // Real-feel Temp
// // // High/Low Temp
// // // Likelihood of Rain
// // Hourly forecast
// // // Temperature
// // // Conditions (Using an icon instead of text)
// // // Hour of the day
// // 10-day Daily forecast
// // // Date
// // // Conditions (Using an icon instead of text)
// // // High/low Temp
