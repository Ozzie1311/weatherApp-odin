

  const temperature = document.querySelector('#temperature-span');
  const cityname = document.querySelector('#cityname');
  const forecastSpan = document.querySelector('#forecast-span');
  const timeSpan = document.querySelector('#time-span');
  const dateSpan = document.querySelector('#date-span');
  const windNumber = document.querySelector('#wind-number');
  const windIcon = document.querySelector('#wind-icon');
  const humidityNumber = document.querySelector('#humidity-number');
  const humidityIcon = document.querySelector('#humidity-icon');
  const humidityDescription = document.createElement('span');
  const windDescription = document.createElement('span');
  const temperatureButton = document.querySelector('#temperature-button');
  const locationInput = document.querySelector('#location-input');

export function setImage (object) {
  const forecastImg = document.querySelector('#forecast-img');

  if (object.conditions === 'Partially cloudy') {
        forecastImg.src = "./assets/partially-cloudy.png";
      } else if (object.conditions === 'Clear') {
        forecastImg.src = "./assets/clear.png";
      } else if (object.conditions === 'Rain, Partially cloudy') {
        forecastImg.src = "./assets/rain.png";
      } else if (object.conditions === 'Overcast') {
        forecastImg.src = "./assets/overcast.png";
      };
};

  const API = {
  key: '2RCJL9S6D98FPFZN6ZSPVFVY3',
}

 export async function fetchWeather (key, location) {

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

export function getData (fetchWeather) {




    fetchWeather(API.key, locationInput.value).then((information) => {
      temperature.textContent = `${information.temperature}°C - ${parseInt(information.temperature * 9/5 + 32)}°F`;
      cityname.innerHTML = `${information.address} <i class="fa-solid fa-location-dot"></i>`;
      forecastSpan.textContent = information.conditions;
      timeSpan.textContent = information.time;
      dateSpan.textContent = information.datetime;
      windNumber.textContent = `${information.wind} km/h`;
      windIcon.innerHTML = `<i class="fa-solid fa-wind"></i>`;
      humidityNumber.textContent = `${information.humidity}%`;
      humidityIcon.innerHTML = `<i class="fa-solid fa-droplet"></i>`;

      setImage(information);

      humidityDescription.classList.add('description');
      humidityDescription.textContent = 'Humidity';

      const humidityContainer = document.querySelector('#humidity');
      humidityContainer.append(humidityDescription);

      windDescription.classList.add('description');
      windDescription.textContent = 'Wind Flow';

      const windContainer = document.querySelector('#wind');
      windContainer.append(windDescription);
      
    })

  };

  

