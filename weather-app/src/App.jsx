import { useState, useEffect } from 'react';
import './App.css';
import WeatherIcon from './components/WeatherIcons';
import Humidity from './assets/pictures/humidity.png';
import Wind from './assets/pictures/wind.png';
import Visibility from './assets/pictures/visibility.png'
import WeatherBackground from './components/WeatherBackground';

const api = {
    key: "97255ca1037987ecf2e172ef246f32d9",
    baseApi: "https://api.openweathermap.org/data/2.5/",
};

function App() {
    const [weather, setWeather] = useState({});
    const [forecastHourly, setForecastHourly] = useState({});
    const [loadingWeather, setLoadingWeather] = useState(true);
    const [loadingForecast, setLoadingForecast] = useState(true);
    const [search, setSearch] = useState("");


    useEffect(() => {
        // Function to fetch weather data baseApid on user's location
        const fetchWeatherByLocation = async (latitude, longitude) => {
            try {
                // Fetch current weather and forecast from OpenWeatherMap API
                const weatherResponse = await fetch(`${api.baseApi}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`);
                const forecastResponse = await fetch(`${api.baseApi}forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`);

                if (!weatherResponse.ok || !forecastResponse.ok) {
                    throw new Error("Failed to fetch weather data.");
                }

                const weatherResult = await weatherResponse.json();
                const forecastHourlyResult = await forecastResponse.json();

                setWeather(weatherResult);
                setForecastHourly(forecastHourlyResult);

                setLoadingWeather(false);
                setLoadingForecast(false);
            } catch (error) {
                console.error(error);
            }
        };

        // Use the Geolocation API to get the user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByLocation(latitude, longitude);
                },
                (error) => {
                    console.error(error);
                    // If user doesn't share location, fetch weather data for Montreal
                    fetchWeatherByLocation(45.50884, -73.58781); // Montreal coordinates
                }
            );
        } else {
            console.error("Geolocation is not supported by your browser.");
            // If geolocation is not supported, fetch weather data for Montreal
            fetchWeatherByLocation(45.50884, -73.58781); // Montreal coordinates
        }
    }, []);






    const handleSearch = () => {
        if (search) {
            // Fetch current weather data
            fetch(`${api.baseApi}weather?q=${search}&units=metric&APPID=${api.key}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch weather data");
                    }
                    return res.json();
                })
                .then((result) => {
                    console.log(result);
                    setWeather(result);
                })
                .catch(error => {
                    console.error("Error fetching weather data:", error);
                    // Handle the error as needed, e.g., display an error message
                });

            // Fetch forecast data
            fetch(`${api.baseApi}forecast?q=${search}&units=metric&appid=${api.key}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch forecast data");
                    }
                    return res.json();
                })
                .then((forecastHourlyResult) => {
                    console.log(forecastHourlyResult);
                    setForecastHourly(forecastHourlyResult);
                })
                .catch(error => {
                    console.error("Error fetching forecast data:", error);
                    // Handle the error as needed, e.g., display an error message
                });
        }
    };



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

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const period = hours >= 12 ? 'pm' : 'am';

        // Convert to 12-hour format
        const formattedHours = hours % 12 || 12;

        // Ensure minutes are displayed with leading zeros if less than 10
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes} ${period}`;
    }

    // const getWeatherBackgroundImage = (icon) => {
    //   switch (icon) {
    //     case '01d':
    //       return background01d;
    //     case '01n':
    //       return background01n; // Use the same image for both '01d' and '01n'
    //     case '02d':
    //       return background02d;
    //     case '02n':
    //       return background02n; // Use the same image for both '02d' and '02n'
    //     case '03d':
    //       return background03d;
    //     case '03n':
    //       return background03n; // Use the same image for both '03d' and '03n'
    //     case '04d':
    //       return background04d;
    //     case '04n':
    //       return background04n; // Use the same image for both '04d' and '04n'
    //     case '09d':
    //       return background09d;
    //     case '09n':
    //       return background09n; // Use the same image for both '09d' and '09n'
    //     case '10d':
    //       return background10d;
    //     case '10n':
    //       return background10n; // Use the same image for both '10d' and '10n'
    //     case '11d':
    //       return background11d;
    //     case '11n':
    //       return background11n; // Use the same image for both '11d' and '11n'
    //     case '13d':
    //       return background13d;
    //     case '13n':
    //       return background13n; // Use the same image for both '13d' and '13n'
    //     case '50d':
    //       return background50d;
    //     case '50n':
    //       return background50n; // Use the same image for both '50d' and '50n'
    //     default:
    //       return `url(defaultImage.jpg)`; // Use a default image or handle the default case
    //   }
    // };



    return (
        <>
            {(loadingWeather && loadingForecast) ? (
                <p>loading...</p>
            ) : (
                <div className='wrapper'>
                    <WeatherBackground icon={weather.weather[0].icon} />
                    <div className='container'>
                        <div className='innerContainer'>
                            <div className='div-search'>
                                <div className='input-area'>
                                    <input
                                        onChange={(e) => setSearch(e.target.value)}
                                        type="text"
                                    />
                                    <button onClick={handleSearch}>
                                        <svg width="1.5rem" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                    </button>
                                </div>
                                <span>{weather.name}</span>
                            </div>
                            <div className='div-weather'>
                                <div>
                                    <WeatherIcon iconCode={weather.weather[0].icon} />
                                    <h2>{weather.weather[0].description}</h2>
                                    <span className='current-time'>today {getCurrentTime()}</span>
                                </div>
                                <div>
                                    <span className='temp'>{Math.round(weather.main.temp)}°</span>
                                    <span className='temp-max-min'>{Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°</span>
                                </div>
                            </div>
                            <div>
                                <div className='div-weather-info'>
                                    <div>
                                        <img src={Humidity} alt="" />
                                        <span id='weather-info-title'>Humidity</span>
                                        <span>{weather.main.humidity} %</span>
                                    </div>
                                    <div>
                                        <img src={Wind} alt="" />
                                        <span id='weather-info-title'>Wind</span>
                                        <span>{Math.round((weather.wind.speed * 3.6).toFixed(2))} km/h</span>
                                    </div>
                                    <div>
                                        <img src={Visibility} alt="" />
                                        <span id='weather-info-title'>Visibility</span>
                                        <span>{Math.round((weather.visibility * 0.001).toFixed(2))} km</span>
                                    </div>
                                </div>
                            </div>
                            <div className='wrapper-div-forecast'>
                                {forecastHourly.list.slice(0, 6).map((item, index) => (
                                    <div className='div-forecast' key={index}>
                                        <span>{convertUnixTimestampToTime(item.dt, forecastHourly.city.timezone)}</span>
                                        <WeatherIcon iconCode={item.weather[0].icon} />
                                        <span>{Math.round(item.main.temp)}°</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            )}
        </>
    );
}

export default App;
