const locationInput = document.getElementById("location-input");
const key = "HY7CDFGCMZD8HYD2K3PGJX8VQ";

// Current Forecast Data Elements
const currentForecastParent = document.getElementById(
  "current-forecast-parent"
);
const currLocation = document.createElement("h1");
const currConditions = document.createElement("h2");
const currTemp = document.createElement("p");
currTemp.style.fontSize = "40px";
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

// Daily Forecast Data Elements
const dailyForecastParent = document.getElementById("daily-forecast-parent");
const dailyForecastHeader = document.getElementById("daily-forecast-header");
const dailyForecastData = document.getElementById("daily-forecast-data");
dailyForecastParent.append(dailyForecastHeader, dailyForecastData);

const footer = document.getElementById("footer-text");

async function fetchWeatherData() {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput.value}?key=${key}&iconSet=icons1`
    );
    const data = await response.json();
    console.log(data);

    // Clears existing elements
    hourlyForecastData.innerHTML = "";
    dailyForecastData.innerHTML = "";

    // Render and format current weather data
    currLocation.innerHTML = data.resolvedAddress;
    currConditions.innerHTML = data.currentConditions.conditions;
    currTemp.innerHTML = parseInt(data.currentConditions.temp) + "&deg;";
    currRealFeel.innerHTML =
      "Feels like " + parseInt(data.currentConditions.feelslike) + "&deg;";
    currTempMaxMin.innerHTML =
      "High " +
      parseInt(data.days[0].tempmax) +
      "&deg; &#183; Low " +
      parseInt(data.days[0].tempmin) +
      "&deg;";

    // Render and format hourly forecast data.
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
          hourlyTemp.innerHTML = parseInt(el.temp) + "&deg;";
          hourlyHour.innerHTML = hour + meridiem;
        } else {
          hourlyTemp.innerHTML = parseInt(el.temp) + "&deg;";
          hourlyHour.innerHTML = hour + meridiem;
        }

        hourlyDiv.append(hourlyTemp, hourlyIcon);
        if (el.precipprob > 0) {
          const rainChance = document.createElement("p");
          rainChance.innerHTML = parseInt(el.precipprob) + "%";
          rainChance.style.color = "#95b4e3";
          hourlyDiv.appendChild(rainChance);
        } else {
          const rainChance = document.createElement("p");
          rainChance.innerHTML = parseInt(el.precipprob) + "%";
          rainChance.style.color = "#95b4e3";
          hourlyDiv.appendChild(rainChance);
        }
        hourlyDiv.append(hourlyHour);
        hourlyForecastData.appendChild(hourlyDiv);
      }
    });

    // Display the first 8 hours of the next day
    const start = 0;
    const end = 9;
    data.days[1].hours.slice(start, end).forEach((el) => {
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
          hourlyTemp.innerHTML = parseInt(el.temp) + "&deg;";
          hourlyHour.innerHTML = hour + meridiem;
        } else if (hour === 0) {
          hourlyTemp.innerHTML = parseInt(el.temp) + "&deg;";
          hourlyHour.innerHTML = 12 + meridiem;
        } else {
          hourlyTemp.innerHTML = parseInt(el.temp) + "&deg;";
          hourlyHour.innerHTML = hour + meridiem;
        }

        hourlyDiv.append(hourlyTemp, hourlyIcon);
        if (el.precipprob > 0) {
          const rainChance = document.createElement("p");
          rainChance.innerHTML = parseInt(el.precipprob) + "%";
          rainChance.style.color = "#95b4e3";
          hourlyDiv.appendChild(rainChance);
        } else {
          const rainChance = document.createElement("p");
          rainChance.innerHTML = parseInt(el.precipprob) + "%";
          rainChance.style.color = "#95b4e3";
          hourlyDiv.appendChild(rainChance);
        }
        hourlyDiv.append(hourlyHour);
        hourlyForecastData.appendChild(hourlyDiv);
      }
    });

    // Render and format daily forecast data.
    // Loop through each day of the future 10 days.
    data.days.forEach((day) => {
      const monthNum = parseInt(day.datetime.substring(5, 7));
      const dayNum = parseInt(day.datetime.substring(8, 10));

      const dailyDiv = document.createElement("div");
      const dailyTempHigh = document.createElement("p");
      dailyTempHigh.id = "daily-temp-high";
      const dailyTempLow = document.createElement("p");
      dailyTempLow.id = "daily-temp-low";
      const dailyIcon = document.createElement("img");
      const monthDay = document.createElement("p");

      // Render and format daily forecast data.
      dailyForecastParent.style.display = "flex";
      dailyForecastHeader.innerHTML =
        '<i class="fa-regular fa-calendar"></i>' + " 14-day forecast";
      dailyDiv.id = "daily-div";
      dailyTempHigh.innerHTML = parseInt(day.tempmax) + "&deg;";
      dailyTempLow.innerHTML = parseInt(day.tempmin) + "&deg;";
      dailyIcon.src = `/icons/${day.icon}.svg`;
      monthDay.innerHTML = monthNum + "/" + dayNum;

      dailyDiv.append(dailyTempHigh, dailyTempLow, dailyIcon);
      if (day.precipprob > 0) {
        const rainChance = document.createElement("p");
        rainChance.innerHTML = parseInt(day.precipprob) + "%";
        rainChance.style.color = "#95b4e3";
        dailyDiv.appendChild(rainChance);
      } else {
        const rainChance = document.createElement("p");
        rainChance.innerHTML = parseInt(day.precipprob) + "%";
        rainChance.style.color = "#95b4e3";
        dailyDiv.appendChild(rainChance);
      }
      dailyDiv.appendChild(monthDay);
      dailyForecastData.appendChild(dailyDiv);
    });

    footer.innerHTML =
      "Weather data up-to-date as of " +
      data.currentConditions.datetime +
      " location time.";
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
