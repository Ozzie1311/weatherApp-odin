import { getData, fetchWeather} from "./DOMlogic.js";

const form = document.querySelector('#form');
const locationInput = document.querySelector('#location-input');const temperatureButton = document.querySelector('#temperature-button');



locationInput.value = 'Maturin';
getData(fetchWeather);


form.addEventListener('submit', (event) => {
  event.preventDefault();
  getData(fetchWeather);
});


 



