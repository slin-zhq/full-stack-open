const Country = ({ country }) => {
    const { common, official } = country.name
    const capital = country.capital ? country.capital[0] : null
    const area = country.area
    const languages = country.languages
    const languageKeys = Object.keys(languages)
    const { png, alt } = country.flags

    return (
        <div>
            <h1>{common}</h1>
            <div><i>Official name:</i> {official}</div>
            <div><i>Capital:</i> {capital}</div>
            <div><i>Area:</i> {area} km<sup>2</sup></div>
            <h4>Languages:</h4>
            <ul>
                {languageKeys.map(key => (<li key={key}>{languages[key]}</li>))}
            </ul>
            <img src={png} alt={alt} />
        </div>
    )
}

export default Country