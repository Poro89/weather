import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_KEY = "e57307eb0fbe64d57a70f463bd737023";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", type: "error" });
  const toastTimerRef = useRef(null);

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
      const response = await axios.get(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      console.log("Weather Data:", response.data); // ✅ Debugging log

      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeather(null);
      const status = error?.response?.status;
      if (status === 404) {
        showToast("City not found. Check the spelling and try again.", "error");
      } else {
        showToast("Couldn’t fetch weather right now. Please try again.", "error");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {toast.open && (
        <div
          style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            zIndex: 9999,
            pointerEvents: "none",
          }}
          role="status"
          aria-live="polite"
        >
          <div
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 14px",
              borderRadius: "10px",
              border:
                toast.type === "error"
                  ? "1px solid rgba(255, 99, 99, 0.45)"
                  : "1px solid rgba(123, 186, 255, 0.45)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              backgroundColor: "rgba(30, 30, 30, 0.95)",
              color: "white",
              minWidth: "280px",
              maxWidth: "420px",
              backdropFilter: "blur(10px)",
            }}
          >
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => setToast((t) => ({ ...t, open: false }))}
              style={{
                marginLeft: "auto",
                border: "none",
                background: "transparent",
                color: "rgba(255,255,255,0.8)",
                fontSize: "20px",
                lineHeight: "18px",
                cursor: "pointer",
              }}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        </div>
      )}
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
