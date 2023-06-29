import { useState, useEffect } from 'react'

import SearchBar from './components/SearchBar'
import Country from './components/Country'

import countryService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState(null)
  const [countrySearchKeys, setCountrySearchKeys] = useState(null)
  const [countryToShow, setCountryToShow] = useState(null)
  const [countryWeather, setCountryWeather] = useState(null)
  
  // console.log('Render App; countryToShow:', countryToShow)
  useEffect(() => {
    // console.log('>>> useEffect() <<<')
    if (!countries) {
      countryService
      .getAll()
      .then(countries => {
        setCountries(countries)
        setCountrySearchKeys(countries.map(country => 
          country.name.common
        ))
      })
    }

    if (countryToShow && countryToShow.capitalInfo.latlng) {
      const [ lat, lon ] = countryToShow.capitalInfo.latlng
      weatherService
        .get(lat, lon)
        .then(weatherData => {
          setCountryWeather(weatherData)
        })
    }
  }, [countryToShow])

  const handleQueryChange = (event) => {
    // console.log('––– handleQueryChange() –––')
    if (countryToShow) {
      setQuery('')
    } else {
      setQuery(event.target.value)
    }
    setCountryToShow(null)
    setCountryWeather(null)
  }

  const findAndSetCountryToShow = (country) => {
    // console.log('––– findAndSetCountryToShow() –––')
    setCountryToShow(countries.find(c => c.name.common === country))
    setQuery(country)
  }

  const showCountry = () => {
    // console.log('––– showCountry() –––')
    return (
      <Country country={countryToShow} weatherData={countryWeather} />
    )
  }

  const showSearchResults = () => {
    // console.log('––– showSearchResults() –––')
    const countriesMatched = countrySearchKeys.filter(c => c.toLowerCase().includes(query.toLowerCase()))

    // console.log('query: ', query)
    // console.log('countriesMatched: ', countriesMatched)
     
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
                <button onClick={() => findAndSetCountryToShow(c)}>show</button>
              </div>))
          }
        </div>
      )
    } else if (countriesMatched.length === 1) {
      findAndSetCountryToShow(countriesMatched[0])
    } else {
      return (
        <div style={{color: 'gray'}}>No match found</div>
      )
    }
  }

  if (!countries) {
    return null
  }

  // Search results are shown when user has typed in query AND we're not showing view of a single country
  // Otherwise, when the search has narrowed down to a single country, the country is shown.  
  return (
    <div>
      <p style={{color: 'gray'}}>Data for countries – Saw S. Lin's submission</p>
      <SearchBar query={query} onQueryChange={handleQueryChange} isCountryFound={countryToShow}/>
      {query && !countryToShow ? showSearchResults() : null}
      {countryToShow ? showCountry() : null}
    </div>
  )
}

export default App