async function fetchWeatherData() {
  try {
    const location = document.getElementById("location").value;
    const hourly = document.getElementById("hourly-details");
    const daily = document.getElementById("today-details");
    const key = "HY7CDFGCMZD8HYD2K3PGJX8VQ";

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`
    );
    const data = await response.json();
    console.log(data);

    // Render Hourly Weather Data
    hourly.innerHTML =
      "Hourly Forecast" +
      "<br></br>" +
      "Current forecast: " +
      data.currentConditions.conditions +
      "<br></br>" +
      "Current Temp: " +
      data.currentConditions.temp +
      " F" +
      "<br></br>" +
      "Chance of rain: " +
      data.currentConditions.precipprob +
      "%" +
      "<br></br>" +
      "Wind Speed: " +
      data.currentConditions.windspeed +
      " MPH";

    // Render Daily Weather Data
    daily.innerHTML =
      "Daily Forecast" +
      "<br></br>" +
      data.days[1].datetime +
      "<br></br>" +
      "Current Forecast: " +
      data.days[1].conditions;
  } catch (error) {
    console.error("Could not fetch resources:", error);
  }
}

// Make the user enter in their own API key to use the app -- Can be a pop up at the beginning of page load to let the user know the requirements.

// Display the current forcast as well as the forecast for the rest of the day, per hour.
