const WeatherSearch = ({ city, setCity, onSearch }) => {
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") onSearch();
    };

    return (
        <div className="search-box">
        <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="أدخل اسم المدينة"
        />
        <button onClick={onSearch}>بحث</button>
        </div>
    );
};

export default WeatherSearch;
