import { useState, useEffect } from 'react'
import './App.css'

import restCountries from './services/restCountries'
import OpenWeatherMap from './services/OpenWeatherMap';


function App() {
  const [searchInput, setSearchInput] = useState('');
  const [countries, setCountries] = useState([]);
    // State for storing the content to be displayed
    const [content, setContent] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [weatherArr, setWeatherArr] = useState(null);

  useEffect(() => {
    console.log('effect')
    restCountries.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data);
      })
  }, [])

  useEffect(() => {
    // Reset selected country when search changes
    setSelectedCountry(null);
    setWeatherArr([]);

    const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    );
  
    if (filteredCountries.length > 0 && filteredCountries.length <= 10) {
      // Fetch weather data for each filtered country and store in weatherArr
      const fetchWeatherData = async () => {
        const weatherDataPromises = filteredCountries.map(country =>
          OpenWeatherMap.getWeather(country.latlng[0], country.latlng[1])
            .then(response => ({
              country: country.name.common,
              weather: response.data
            }))
        );

        const weatherData = await Promise.all(weatherDataPromises);
        setWeatherArr(weatherData);
      };

      fetchWeatherData();
    }



    switch (true) {
      case searchInput === '':
        setContent(<p>Enter a search term</p>);
        break;
      case filteredCountries.length > 10:
        setContent(<p>Too many matches, specify another filter</p>);
        break;
      case filteredCountries.length > 1:
        setContent(filteredCountries.map(country => (
          <div className='countryResult' key={country.cca3}>
            {country.name.common}
            <button onClick={() => setSelectedCountry(country)}>
              Show Details
            </button>
          </div>
        )));
        break;
      case filteredCountries.length === 1:
        setSelectedCountry(filteredCountries[0]);
        break;
      default:
        setContent(null);
    }
  }, [searchInput, countries]);

  // Render country details when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      const weatherData = weatherArr.find(w => w.country === selectedCountry.name.common);

      setContent(
        <div className='countryResult' key={selectedCountry.cca3}>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area} km^2</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(selectedCountry.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img 
            src={selectedCountry.flags.png} 
            alt={`Flag of ${selectedCountry.name.common}`} 
            width="150" 
          />
          {weatherData && (
            <>
              <h3>Weather in {selectedCountry.capital}</h3>
              <p>Temperature: {weatherData.weather.main.temp} Celsius</p>
              <img 
                src={`http://openweathermap.org/img/wn/${weatherData.weather.weather[0].icon}.png`} 
                alt="Weather icon" 
              />
              <p>Wind: {weatherData.weather.wind.speed} m/s</p>
              
            </>
          )}
        </div>
      );
    }
  }, [selectedCountry]);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  }
  

  //console.log(`weatherArr: ${weatherArr}`);

  return (<>
    <div>
      find countries: <input value={searchInput} onChange={handleSearchInput}/>
    </div>
    
    <h2>Results:</h2>
    <div>
      {content}
    </div>
</>);
}

export default App
