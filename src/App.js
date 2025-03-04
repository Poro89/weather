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
      setWeather(response.data);
    } catch (error) {
      alert("City not found!");
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1>Jemsey's Weather App 🌤</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown} // ✅ Detect Enter key press
          style={styles.input}
        />
        <button onClick={fetchWeather} style={styles.button}>
          Get Weather
        </button>

        {weather && (
          <div style={styles.card}>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>{weather.weather[0].description}</p>
            <h3 style={styles.temperature}>
              {weather.main.temp}°C / {(weather.main.temp * 9/5 + 32).toFixed(2)}°F
            </h3>
          </div>
        )}

        <p style={styles.footer}>Created by Jemsey Amonsot</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    color: "white",
    overflow: "hidden",
    margin: "0",
    padding: "0",
    position: "fixed",
    top: "0",
    left: "0",
  },
  overlay: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "15px",
    boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.1)",
    width: "90%",
    maxWidth: "500px",
    backdropFilter: "blur(10px)",
  },
  input: {
    padding: "12px",
    fontSize: "18px",
    borderRadius: "8px",
    border: "1px solid #555",
    backgroundColor: "#1e1e1e",
    color: "white",
    width: "260px",
    outline: "none",
  },
  button: {
    padding: "12px 20px",
    fontSize: "18px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
  },
  footer: {
    marginTop: "20px",
    fontSize: "14px",
    opacity: "0.6",
    color: "white",
  },
};

export default App;
