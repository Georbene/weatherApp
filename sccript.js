const addResult = async () => {
    const userInput = document.getElementById('countryInput').value.trim();
    if (!userInput) {
        alert("Please enter a city or country name.");
        return;
    }

    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(userInput)}&units=metric&appid=cdacb0ad3366650d62fdf838751135f8`;
    try {
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log(result);

        // Clear the previous result
        document.getElementById('showResult').innerHTML = '';

        // Display the weather information
        document.getElementById('showResult').innerHTML = `
            <p>City: ${result.name}</p>
            <p>Country: ${result.sys.country}</p>
            <p>Pressure: ${result.main.pressure} hPa</p>
            <p>Temperature: ${result.main.temp}°C</p>
            <p>Weather: ${result.weather[0].description}</p>
            <img src="http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png" alt="Weather icon">
        `;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert("Could not fetch weather data. Please try again.");
    }
}