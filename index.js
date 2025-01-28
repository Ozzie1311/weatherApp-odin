const form = document.querySelector('#form');
const locationInput = document.querySelector('#location-input');
const locationTemperature = document.querySelector('#location-temperature');
const locationForecast = document.querySelector('#location-forecast');
const locationSpan = document.querySelector('#location-span');

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
      conditions: weatherData.days[0].conditions,
    }
    return information;
  } catch (error) {
    console.log('Error: ', error.name);
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  function getData (fetchWeather) {
    fetchWeather(API.key, locationInput.value).then((information) => {
      locationSpan.textContent = information.address;
      locationTemperature.textContent = information.datetime;
      locationForecast.textContent = information.conditions;
    })
  };
  getData(fetchWeather);

  
});

