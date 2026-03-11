import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "e57307eb0fbe64d57a70f463bd737023";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", type: "error" });
  const toastTimerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message, type = "error") => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ open: true, message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, open: false }));
      toastTimerRef.current = null;
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const fetchWeather = async () => {
    if (!city.trim()) {
      showToast("Please enter a city name.", "error");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
      );
      setWeather(response.data);
    } catch (error) {
      setWeather(null);
      const status = error?.response?.status;
      if (status === 404) {
        showToast("City not found. Check the spelling and try again.", "error");
      } else {
        showToast("Couldn’t fetch weather right now. Please try again.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="app">
      {toast.open && (
        <div className="toastContainer" role="status" aria-live="polite">
          <div className={`toast ${toast.type === "error" ? "toastError" : "toastInfo"}`}>
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => setToast((t) => ({ ...t, open: false }))}
              className="toastClose"
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="shell">
        <div className="panel">
          <h1 className="title">Jemsey's Weather App 🌤</h1>
          <p className="subtitle">Search a city to see the current weather.</p>

          <div className="controls">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              className="input"
            />
            <button onClick={fetchWeather} className="button" disabled={isLoading}>
              {isLoading ? "Loading..." : "Get Weather"}
            </button>
          </div>

          {weather && (
            <div className="card">
              <h2 className="location">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="desc">{weather.weather[0].description}</p>
              <p className="temp">
                {weather.main.temp}°C / {(weather.main.temp * 9 / 5 + 32).toFixed(2)}°F
              </p>
            </div>
          )}

          <p className="footer">Created by Jemsey Amonsot</p>
        </div>
      </div>
    </div>
  );
}

export default App;

