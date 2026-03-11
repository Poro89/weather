# Weather App

A simple React weather app that fetches current conditions from **OpenWeather**.

## Features

- Search weather by city name
- Shows temperature in **°C** and **°F**
- Error **toast notification** when the city name is invalid or empty

## Requirements

- Node.js (LTS recommended)
- npm (comes with Node.js)

## Setup

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm start
```

Then open `http://localhost:3000`.

## How to use

- Type a city name (example: `London`)
- Press **Enter** or click **Get Weather**
- If the city name is misspelled (example: `Londn`), you’ll see an error toast

## API key note (important)

This project currently contains an OpenWeather API key directly in `src/App.js`.
For production or sharing code publicly, it’s best to move it to an environment variable.

Typical approach with Create React App:

1. Create a `.env` file in the project root
2. Add:

```bash
REACT_APP_OPENWEATHER_API_KEY=your_key_here
```

3. Update the code to read `process.env.REACT_APP_OPENWEATHER_API_KEY`

## Scripts

- `npm start`: run the app in development
- `npm run build`: create a production build
- `npm test`: run tests (if any)

