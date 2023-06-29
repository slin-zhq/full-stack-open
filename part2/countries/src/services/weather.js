import axios from "axios"

const api_key = process.env.REACT_APP_API_KEY

const get = (lat, lon) => {
    return axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
            .then(response => response.data)
}

export default { get }