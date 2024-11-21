import { useState, useEffect } from 'react'
import './App.css'

import restCountries from './services/restCountries'


function App() {
  const [searchInput, setSearchInput] = useState('');
  const [countries, setCountries] = useState([]);
    // State for storing the content to be displayed
    const [content, setContent] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);

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

    const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    );
  
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
        </div>
      );
    }
  }, [selectedCountry]);

  console.log(countries);
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  }
  
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
