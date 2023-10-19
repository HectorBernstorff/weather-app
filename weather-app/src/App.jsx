import { useState, useEffect } from 'react';
import './App.css';
import WeatherIcon from './components/WeatherIcons';
import Humidity from './assets/pictures/humidity.png';
import Wind from './assets/pictures/wind.png';
import Visibility from './assets/pictures/visibility.png'

const api = {
  key: "97255ca1037987ecf2e172ef246f32d9",
  base: "https:api.openweathermap.org/data/2.5/",
};

function App() {
  const [weather, setWeather] = useState({});
  const [forecastHourly, setForecastHourly] = useState({});
  const [forecastDaily, setForecastDaily] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  useEffect(() => {
    // Function to fetch weather data based on user's location
    const fetchWeatherByLocation = (latitude, longitude) => {
      // Fetch current weather from OpenWeatherMap API
      fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((weatherResult) => {
          console.log(weatherResult);
          setWeather(weatherResult);
          setLoading(false);
        });

      // Fetch weather data from the OpenWeatherMap Maps API
      fetch(`${api.base}forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((forecastHourlyResult) => {
          console.log(forecastHourlyResult);
          setForecastHourly(forecastHourlyResult);
        });
    };

    // Use the Geolocation API to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      }, (error) => {
        console.error(error);
        setLoading(false);
      });
    } else {
      console.error("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);




  const handleSearch = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
      })

    fetch(`${api.base}forecast?q=${search}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((forecastHourlyResult) => {
        console.log(forecastHourlyResult);
        setForecastHourly(forecastHourlyResult);
        // Do something with mapResult if needed
      });
  }

  function convertUnixTimestampToTime(unixTimestamp, timeZoneOffset) {
    // Create a Date object from the Unix timestamp
    const date = new Date(unixTimestamp * 1000);

    // Adjust the time to the specified time zone offset
    const targetTime = new Date(date.getTime() + (timeZoneOffset * 1000));

    // Get the hour from the adjusted time
    const hour = targetTime.getUTCHours();

    // Determine the period (AM or PM)
    const period = hour >= 12 ? "pm" : "am";

    // Format the time in "hmma" format
    const formattedHour = (hour > 12 ? hour - 12 : hour).toString();
    // console.log(`${formattedHour}${period}`);
    return `${formattedHour}${period}`;
  }



  return (
    <>
      <div className='wrapper'>
        <div>
          <div>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <span>{weather.name}</span>
        </div>

        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className='div-left'>

                <WeatherIcon iconCode={weather.weather[0].icon} />

                <span>{weather.weather[0].description}</span>

                <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>

                <span>{Math.round(weather.main.temp)}°</span>

                <span>H:{Math.round(weather.main.temp_max)}° L:{Math.round(weather.main.temp_min)}°</span>



              </div>
            </>
          )}
        </div>

        <div>
          {loading ? (
            <p>loading...</p>
          ) : (

            <div className='weather-info'>
              <div>
                <img src={Humidity} alt="" />
                <span>Humidity</span>
                <span>{weather.main.humidity} %</span>
              </div>
              <div>
                <img src={Wind} alt="" />
                <span>Wind</span>
                <span>{weather.wind.speed} km/h</span>
              </div>
              <div>
                <img src={Visibility} alt="" />
                <span>Visibility</span>
                <span>{weather.visibility} km</span>
              </div>
            </div>
          )}
        </div>

        <div className='div-right'>
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : (

              <div className='wrapper-forecast-hourly'>
                {forecastHourly.list.slice(0, 8).map((item, index) => (
                  <div className='forecast-hourly' key={index}>
                    <span>{convertUnixTimestampToTime(item.dt, forecastHourly.city.timezone)}</span>
                    <WeatherIcon iconCode={item.weather[0].icon} />
                    <span>{Math.round(item.main.temp)}°</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
