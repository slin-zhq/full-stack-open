const CountryWeather = ({ capital, weatherData }) => {
    const temp = weatherData.main.temp
    const { description, icon } = weatherData.weather[0]
    const wind = weatherData.wind.speed

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <div><i>Current temperature:</i> {temp} Celcius</div>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
                alt={description} />
            <div><i>Wind speed:</i> {wind} m/s</div>
        </div>
    )
}

export default CountryWeather