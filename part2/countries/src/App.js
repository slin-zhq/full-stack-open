import { useState, useEffect } from 'react'

import SearchBar from './components/SearchBar'
import Country from './components/Country'

import countryService from './services/countries'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState(null)
  const [countrySearchKeys, setCountrySearchKeys] = useState(null)
  const [countryShown, setCountryShown] = useState(null)
  
  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setCountries(countries)
        setCountrySearchKeys(countries.map(country => 
          country.name.common
        ))
      })
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
    setCountryShown(null)
  }

  const toggleShowCountry = (countryToShow) => {
    setCountryShown(countryToShow)
  }

  const showCountry = (countryToShow) => {
    const country = countries.find(c => c.name.common === countryToShow)
    return (
      <Country country={country}/>
    )
  }

  const showSearchResults = () => {
    const countriesMatched = countrySearchKeys.filter(c => c.toLowerCase().includes(query.toLowerCase()))
    
    if (countriesMatched.length > 10) {
      return (
        <div style={{color: 'red'}}>Too many matches ({countriesMatched.length} countries), specify another filter</div>
      )
    } else if (countriesMatched.length > 1) {
      return (
        <div>
          <h4>Matched countries:</h4>
          {
            countriesMatched.map(c => (
              <div key={c}>
                {c}
                <button onClick={() => toggleShowCountry(c)}>show</button>
              </div>))
          }
        </div>
      )
    } else if (countriesMatched.length === 1) {
      return showCountry(countriesMatched[0])
    } else {
      return (
        <div style={{color: 'gray'}}>No match found</div>
      )
    }
  }

  if (!countries) {
    return null
  }

  return (
    <div>
      <p style={{color: 'gray'}}>Data for countries – Saw S. Lin's submission</p>
      <SearchBar query={query} onQueryChange={handleQueryChange}/>
      {query && !countryShown ? showSearchResults() : null}
      {countryShown ? showCountry(countryShown) : null}
    </div>
  )
}

export default App