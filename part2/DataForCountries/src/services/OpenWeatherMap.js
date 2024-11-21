import axios from 'axios'
const API_KEY = import.meta.env.VITE_API_KEY

const URL_WEATHER = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=${API_KEY}`;
const URL_GEO = 'https://studies.cs.helsinki.fi/restcountries/api/name/${}';//takes request


//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
console.log(import.meta.env.VITE_API_KEY);


// Function to get latitude and longitude for a city
const getGeoData = (city) => {
    return axios.get(`${URL_GEO}&q=${city}`);
  };
  
  // Function to get weather data using latitude and longitude
  const getWeather = (lat, lon) => {
    return axios.get(`${URL_WEATHER}&lat=${lat}&lon=${lon}`);
  };
  
  export default { getGeoData, getWeather };