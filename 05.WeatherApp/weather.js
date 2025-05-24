const API_KEY = "Open Weather Map API KEY";
const URL = `https://api.openweathermap.org/data/2.5/weather`;

// https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric

export const getWeatherData = async (city) => {
    try {
        const response = await fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`)
        const json = await response.json();
        return {success: true, data: json};
    } catch (e) {
        console.error(`Error fetching weather: ${e}`);
        return {success: false};
    }
}