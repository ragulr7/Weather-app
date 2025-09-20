import { useEffect, useState } from 'react';
import './App.css';
import find from './assets/Search.jpg';
import sun from './assets/SunIcon.png'; 
import snow from './assets/Snow.png';
import humidityicon from './assets/HumidityIcon.jpg';
import windicon from './assets/WindIcon.png';
import clearIcon from './assets/clear.png';
import cloudIcon from './assets/Cloud.jpg';
import drizzleIcon from './assets/Drizzle.png';
import rainIcon from './assets/Rain.png';
import snowIcon from './assets/Snow.png';

const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
  return (
    <>
      <div className="Images">
        <img src={icon} alt="Weather" className="w-20 h-20" />
      </div>
      <div className="Temperature font-bold text-3xl">{temp}°C</div>
      <div className="Location text-blue-700 font-semibold text-2xl">{city}</div>
      <div className="Country font-extrabold">{country}</div>
      <div className="flex justify-between w-full mt-4">
        <div>
          <span className="Lat">Latitude</span><br />
          <span className="flex justify-center">{lat}</span>
        </div>
        <div>
          <span className="Log">Longitude</span><br />
          <span className="flex justify-center">{log}</span>
        </div>
      </div>
      <div className="flex justify-between w-full mt-4">
        <div>
          <img src={humidityicon} alt="Humidity" className="w-15 h-15" /><br />
          <span className="font-bold">{humidity}%</span><br />
          <span className="font-semibold">Humidity</span>
        </div>
        <div>
          <img src={windicon} alt="Wind" className="w-20 h-20" /><br />
          <span className="font-bold">{wind} km/h</span><br />
          <span className="font-semibold">Wind Speed</span>
        </div>
      </div>
    </>
  );
};

function App() {
  const api_key = '1786d4f13f033a7f7cf087ec2dde2d95';

  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState(snow);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("India");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearIcon, "01n": clearIcon,
    "02d": cloudIcon, "02n": cloudIcon,
    "03d": drizzleIcon, "03n": drizzleIcon,
    "04d": drizzleIcon, "04n": drizzleIcon,
    "09d": rainIcon, "09n": rainIcon,
    "10d": rainIcon, "10n": rainIcon,
    "13d": snowIcon, "13n": snowIcon,
  };

  const search = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setCityNotFound(false);

    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`);
      const data = await res.json();

      if (data.cod === "404") {
        setCityNotFound(true);
        return;
      }

      setHumidity(data.main.humidity);
      setWind((data.wind.speed * 3.6).toFixed(1));
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);

      setCityNotFound(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => setText(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") search();
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="bg-gray-400 w-full min-h-screen flex flex-col items-center">
      <p className="font-bold text-2xl text-red-700 mt-6">Weather App</p>

      <div className="bg-white w-80 rounded-2xl p-6 shadow-lg flex flex-col items-center mt-6">
        <form
          className="relative w-64"
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
        >
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={handleCity}
            value={text}
            className="border-2 rounded-2xl p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img
            src={find}
            alt="Search"
            onClick={search}
            className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          />
        </form>

        <br />

        <div className="mt-4 w-full flex flex-col items-center">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : cityNotFound ? (
            <div className="text-red-500">City Not Found</div>
          ) : (
            <WeatherDetails
              icon={icon}
              temp={temp}
              city={city}
              country={country}
              lat={lat}
              log={log}
              humidity={humidity}
              wind={wind}
            />
          )}
        </div>
      </div>

      <p className="mt-40">Designed by Ragul</p>
    </div>
  );
}

export default App;
