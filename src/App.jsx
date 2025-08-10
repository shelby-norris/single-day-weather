import "./App.css";
import Weather from "./components/Weather";

function App() {
  return (
    <>
      <header>
        <h1>myWeather App</h1>
        <p>Your personal weatherman!</p>
      </header>
      <main>
        <Weather />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
