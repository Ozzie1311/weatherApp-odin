
async function fetchWeather () {
  try {
    let response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Maturin?unitGroup=metric&key=2RCJL9S6D98FPFZN6ZSPVFVY3&contentType=json');
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

function getData (fetchWeather) {
  fetchWeather().then(information => console.log(information.address, information.conditions));
};
getData(fetchWeather);