import { useState, useEffect } from "react";

export default function Weather() {
  const [city, setCity] = useState("New Orleans");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // code to run side effects, like fetching data
    async function getWeather() {
      const key = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY; // keeps your API key secure
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
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
      } finally {
        //
      }
    }

    getWeather();
  }, [city]); // any dependencies to listen to; effect will run again when city changes

  return (
    <>
      <section>
        <h2>Current Weather for {city}</h2>
        {weatherData && weatherData.weather[0].main} <br />
        {weatherData && weatherData.weather[0].description}



        {/* <form>
        <label htmlFor="city">Enter a City</label>
        <input type="text" name="city" id="city" />
        <button type="submit">Get Weather</button>
    </form> */}
      </section>
    </>
  );
}
