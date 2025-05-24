const input = document.querySelector(".cityInput");
const fetchBtn = document.querySelector(".btn");
const weatherData = document.querySelector(".weather");

const fetchWeather = async (city) => {
    const {success, data} = await window.electron.getData("fetchWeather", city);
    if (success && data.cod !== '404') {
        console.log(data);
        const {main: {temp, pressure, humidity}, name: city, weather: [{description, main, icon}], wind: {speed: windSpeed, deg}} = data;
        console.log({temp, city, description, windSpeed, humidity, pressure});

        weatherData.innerHTML = `
            <h3 class="city">${city}</h3>
            <h2 class="temp">${temp}°C</h2>
    
            <span class="description">${description}</span>
    
            <div class="info">
                <p><span>Wind Speed: </span>${windSpeed}</p>
                <p><span>Humidity: </span>${humidity}</p>
                <p><span>Air Pressure: </span>${pressure}</p>
            </div>
        `;
    } else {
        alert(data.message);
    }
}

fetchBtn.addEventListener("click", () => {
    const city = input.value;
    if (!city) {
        return alert("Please enter a city name!");
    }
    fetchWeather(city);
});
