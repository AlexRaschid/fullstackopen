import { useState, useEffect } from 'react'
import './App.css'

import restCountries from './services/restCountries'


function App() {
  const [searchInput, setSearchInput] = useState('');
  const [countries, setCountries] = useState([]);
    // State for storing the content to be displayed
    const [content, setContent] = useState(null);

  useEffect(() => {
    console.log('effect')
    restCountries.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data);
      })
  }, [])

    // Update content based on search input and countries data
    useEffect(() => {
      const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchInput.toLowerCase())
      );
  
      // Use switch statement to set content based on the number of filtered countries
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
            </div>
          )));
          break;
        case filteredCountries.length === 1:
          const country = filteredCountries[0];
          setContent(
            <div className='countryResult' key={country.cca3}>
              <h2>{country.name.common}</h2>
              <p>Capital: {country.capital}</p>
              <p>Area: {country.area} km²</p>
              <h3>Languages:</h3>
              <ul>
              {Object.values(country.languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
            </div>
          );
          break;
        default:
          setContent(null);
      }
    }, [searchInput, countries]); // Dependencies: run this effect when searchInput or countries change

  //console.log(countries);
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
