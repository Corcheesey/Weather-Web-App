async function fetchWeatherData() {
  try {
    const key = "HY7CDFGCMZD8HYD2K3PGJX8VQ";
    const location = document.getElementById("location").value;
    const currentConditionsDiv = document.getElementById(
      "current-conditions-div"
    );
    const hourlyForecastDiv = document.getElementById("hourly-forecast-div");

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}&iconSet=icons1`
    );
    const data = await response.json();
    console.log(data);

    // Render and format current weather data
    const currentData = document.createElement("p");
    currentData.innerHTML =
      data.currentConditions.conditions +
      "<br></br>" +
      "Temp: " +
      data.currentConditions.temp +
      "F" +
      "<br></br>" +
      "Feels like: " +
      data.currentConditions.feelslike +
      "F" +
      "<br></br>" +
      "HIGH: " +
      data.days[0].tempmax +
      "F" +
      " LOW: " +
      data.days[0].tempmin +
      "F" +
      "<br></br>" +
      "Chance of rain: " +
      data.currentConditions.precipprob +
      "%";
    currentConditionsDiv.appendChild(currentData);

    // Loop through each other of the day
    data.days[0].hours.forEach((hour) => {
      // If hour is less than 12, set to AM, else, set to PM.
      let meridiem;
      if (parseInt(hour.datetime.substring(0, 2)) <= 11) {
        meridiem = "AM";
      } else {
        meridiem = "PM";
      }

      // Render and format only future hours of the day
      if (data.currentConditions.datetimeEpoch < hour.datetimeEpoch) {
        const hourlyData = document.createElement("p");
        const hourlyIcon = document.createElement("img");
        hourlyData.innerHTML =
          hour.datetime.substring(0, 2) + meridiem + " " + hour.temp;
        hourlyForecastDiv.appendChild(hourlyData);
        hourlyForecastDiv.appendChild(hourlyIcon);
      }
    });
  } catch (error) {
    console.error("Could not fetch resources:", error);
  }
}

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
