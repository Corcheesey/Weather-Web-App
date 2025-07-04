async function fetchWeatherData() {
  try {
    const location = document.getElementById("location").value;
    const currentConditionsDiv = document.getElementById(
      "current-conditions-div"
    );
    const key = "HY7CDFGCMZD8HYD2K3PGJX8VQ";

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`
    );
    const data = await response.json();
    console.log(data);

    const currentData = document.createElement("p");
    currentData.innerHTML =
      data.currentConditions.conditions +
      "<br></br>" +
      data.currentConditions.temp +
      "<br></br>" +
      data.currentConditions.feelslike +
      "<br></br>" +
      data.days[0].tempmax +
      "/" +
      data.days[0].tempmin +
      "<br></br>" +
      data.currentConditions.precipprob;
    currentConditionsDiv.appendChild(currentData);
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
