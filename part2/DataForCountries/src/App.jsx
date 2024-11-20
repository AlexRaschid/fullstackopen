import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import restCountries from './services/restCountries'


function App() {
  const [searchInput, setSearchInput] = useState('');
  const [countries, setCountries] = useState([]);



  useEffect(() => {
    console.log('effect')
    restCountries.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data);
      })
  }, [])


  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  }

  console.log(countries);
  return (<>
    <div>
      find countries: <input value={searchInput} onChange={handleSearchInput}/>
    </div>
    
    <h2>Results:</h2>
    <div>
        {searchInput === '' ? <p>Enter a search term</p> : <p>type to begin!</p>}
    </div>
</>);
}

export default App
