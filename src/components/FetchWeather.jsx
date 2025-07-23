

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;


    const FetchWeather = async (cityName) => {

    try {
        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) throw new Error("لم يتم العثور على المدينة");

        const data = await response.json();
        const { main, description } = data.weather[0];
        const { temp } = data.main;

        return { data: { status: main, description, temp }, err: null };
    } catch (err) {
        return { data: null, err: err.message };
    }
};

export default FetchWeather;
