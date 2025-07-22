import sunnyImg from '../assets/images/sunny.jpg';
import rainImg from '../assets/images/rain.jpg';
import stormImg from '../assets/images/storm.jpg';

import '../assets/css/weather-card.css';

const WeatherCard = ({ temp, condition, description }) => {
    
    const getColor = (t) => {
        return t < 0 ? "#0033cc" :
            t <= 10 ? "#3399ff" :
            t <= 20 ? "#66ccff" :
            t <= 25 ? "#99cc66" :
            t <= 30 ? "#ffff66" :
            t <= 35 ? "#ff9933" :
            "#ff3300";
    };

    
    const getWeatherImage = (condition) => {
        switch (condition?.toLowerCase()) {
            case 'clear':
                return sunnyImg;
            case 'rain':
            case 'drizzle':
                return rainImg;
            case 'thunderstorm':
                return stormImg;
            default:
                return sunnyImg;
            }
    };

    const imageSrc = getWeatherImage(condition);


    return (
        <div className="card">
        <div className="image-box">
            <img src={imageSrc} alt="Weather" />
        </div>

        <div className="weather-des" style={{ backgroundColor: getColor(temp) }}>
            <p>{temp}°C</p>
        </div>

        <div className="weather-status">
            <h2>الحالة: <span style={{ color: getColor(temp) }}>{condition}</span></h2>
            <p>{description}</p>
        </div>
        </div>
    );
};

export default WeatherCard;
