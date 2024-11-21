import axios from 'axios'
const API_KEY = import.meta.env.VITE_API_KEY;

const URL_GEO = `http://api.openweathermap.org/geo/1.0/direct`;
const URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather`;//takes request


//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
console.log(import.meta.env.VITE_API_KEY);


// Function to get latitude and longitude for a city
const getGeoData = (city) => {
  console.log(city.toString())
  console.log(API_KEY)
    console.log(`getGeo: ${URL_GEO}?&q=${city}&appid=${API_KEY}`);
    return axios.get(`${URL_GEO}?&q=${city}&appid=${API_KEY}`);
  };
  
  // Function to get weather data using latitude and longitude
  const getWeather = (lat, lon) => {
    console.log(`${URL_WEATHER}?&lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    return axios.get(`${URL_WEATHER}?&lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  };
  
  export default { getGeoData, getWeather };