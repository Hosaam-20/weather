import { useState } from "react";
import WeatherCard from "../components/WeatherCard";
import WeatherSearch from "../components/WeatherSearch";
import FetchWeather from "../components/FetchWeather"; 
import '../App.css'; 

const WeatherApp = () => {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {

    if (!city) return;
        const { data, err } = await FetchWeather(city);
    if (err) {
        setError(err);
        setWeather(null);
    } else {
        setWeather(data);
        setError("");
    }
    };

    return (
        
        <div className="weather-app">
        <WeatherSearch city={city} setCity={setCity} onSearch={handleSearch} />
        
        {error && <p className="error">{error}</p>}

        {weather && (
            <WeatherCard
            temp={weather.temp}
            condition={weather.status}
            description={weather.description}
            />
        )}
        </div>
    );
};

export default WeatherApp;
