import { useState, useEffect } from "react";

export default function Weather() {
  const [city, setCity] = useState("New Orleans");
  const [weatherData, setWeatherData] = useState(null);
  // handling loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function displayWeather() {
    if (weatherData) {
      return (
        <div id="weather-div">
          <p>Description: <span>{weatherData.weather[0].description}</span></p>
          <p>Temperature: <span>{weatherData.main.temp}</span> °F</p>
          <p>Feels Like: <span>{weatherData.main.feels_like}</span> °F</p>

        </div>
    )
  }
  };


  useEffect(() => {
    // code to run side effects, like fetching data
    async function getWeather() {
      setLoading(true); // start loading
      const key = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY; // keeps your API key secure
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setWeatherData(result);
        console.log(result);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false); // stop loading
      }
    }

    getWeather();
  }, [city]); // any dependencies to listen to; effect will run again when city changes

  return (
    <>
      <section>
        <h2>Current Weather for {city}</h2>

        {loading && <p>Loading...</p>}

        {error && <p>Oops! Something went wrong!</p>}

        {displayWeather()}

        {/* <form>
        <label htmlFor="city">Enter a City</label>
        <input type="text" name="city" id="city" />
        <button type="submit">Get Weather</button>
    </form> */}
      </section>
    </>
  );
}