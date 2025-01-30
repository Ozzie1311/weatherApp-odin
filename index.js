const form = document.querySelector('#form');
const locationInput = document.querySelector('#location-input');
const forecastImg = document.querySelector('#forecast-img');
const temperature = document.querySelector('#temperature-span');
const cityname = document.querySelector('#cityname');
const forecastSpan = document.querySelector('#forecast-span');
const timeSpan = document.querySelector('#time-span');
const dateSpan = document.querySelector('#date-span');
const windNumber = document.querySelector('#wind-number');
const windIcon = document.querySelector('#wind-icon');
const humidityNumber = document.querySelector('#humidity-number');
const humidityIcon = document.querySelector('#humidity-icon');


const API = {
  key: '2RCJL9S6D98FPFZN6ZSPVFVY3',
}



async function fetchWeather (key, location) {
  try {
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${key}&contentType=json`);
    let weatherData = await response.json();
    let information =  {
      address: weatherData.resolvedAddress,
      datetime: weatherData.days[0].datetime,
      // conditions: weatherData.days[0].conditions,
      conditions: weatherData.currentConditions.conditions,
      temperature: weatherData.currentConditions.temp,
      time: weatherData.currentConditions.datetime,
      humidity: weatherData.currentConditions.humidity,
      wind: weatherData.currentConditions.windspeed,
    }
    return information;
    // return weatherData;
  } catch (error) {
    console.log('Error: ', error.name);
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  function getData (fetchWeather) {
    fetchWeather(API.key, locationInput.value).then((information) => {
      temperature.textContent = `${information.temperature}°C`;
      cityname.textContent = information.address;
      forecastSpan.textContent = information.conditions;
      timeSpan.textContent = information.time;
      dateSpan.textContent = information.datetime;
      windNumber.textContent = information.wind;
      windIcon.innerHTML = `<i class="fa-solid fa-wind"></i>`;
      humidityNumber.textContent = information.humidity;
      humidityIcon.innerHTML = `<i class="fa-solid fa-droplet"></i>`;
      console.log(information);
    })
  };
  getData(fetchWeather);

  
});

