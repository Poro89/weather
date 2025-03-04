import React, { useState } from "react";
import axios from "axios";

const API_KEY = "e57307eb0fbe64d57a70f463bd737023";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      console.log("Weather Data:", response.data); // ✅ Debugging log

      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("City not found!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Weather App 🌤</h1>
      <input
        type="text"
        style={{ padding: "10px", margin: "10px", fontSize: "16px" }}
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button style={{ padding: "10px 15px", fontSize: "16px", cursor: "pointer" }} onClick={fetchWeather}>
        Get Weather
      </button>

      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys?.country}</h2>
          <p>{weather.weather?.[0]?.description}</p>

          {/* ✅ Ensure icon exists before rendering */}
          {weather?.weather?.[0]?.icon ? (
  <img
    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
    alt="Weather Icon"
    onError={(e) => console.error("Icon failed to load:", e)}
    style={{ width: "80px", height: "80px" }} 
  />
) : (
  <p>No icon available</p>
)}


          <h3>{weather.main?.temp}°C</h3>
        </div>
      )}
    </div>
  );
}

export default App;
