import React, { useState, useEffect } from 'react';
import { Panel } from '../';

// Fake weather data - gerçek projede API'den gelecektir
const weatherData = {
  location: 'Ankara, Akyurt',
  temperature: 24,
  condition: 'Güneşli',
  icon: 'https://openweathermap.org/img/wn/01d@2x.png',
  humidity: 45,
  windSpeed: 12,
  pressure: 1012,
  feelsLike: 26,
  forecast: [
    { day: 'Bugün', high: 24, low: 14, condition: 'Güneşli', icon: '01d' },
    { day: 'Yarın', high: 26, low: 15, condition: 'Parçalı Bulutlu', icon: '02d' },
    { day: 'Çarşamba', high: 23, low: 13, condition: 'Hafif Yağmurlu', icon: '10d' }
  ]
};

// Hava durumu ikonu için yardımcı fonksiyon
const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

const WeatherPanel: React.FC = () => {
  const [weather, setWeather] = useState(weatherData);
  const [loading, setLoading] = useState(false);
  
  // Gerçek uygulamada hava durumu verileri API'den çekilecektir
  useEffect(() => {
    // Örnek API çağrısı simülasyonu
    setLoading(true);
    const timer = setTimeout(() => {
      setWeather(weatherData);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Panel 
      title="Hava Durumu"
      colorType="blue"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      }
    >
      {loading ? (
        <div className="panel-loading">Yükleniyor...</div>
      ) : (
        <div className="weather-panel">
          <div className="weather-location">{weather.location}</div>
          
          <div className="weather-main">
            <div className="weather-info">
              <div className="weather-temp">{weather.temperature}°C</div>
              <div className="weather-condition">{weather.condition}</div>
            </div>
            <div className="weather-icon">
              <img src={weather.icon} alt={weather.condition} />
            </div>
          </div>
          
          <div className="weather-details">
            <div className="weather-detail-item">
              <span className="weather-detail-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </span>
              <span>Rüzgar: {weather.windSpeed} km/s</span>
            </div>
            
            <div className="weather-detail-item">
              <span className="weather-detail-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14.5v.5a2 2 0 01-2 2h-3a2 2 0 01-2-2v-5a2 2 0 012-2h3a2 2 0 012 2v.5M8 9l4-4 4 4M8 15l4 4 4-4" />
                </svg>
              </span>
              <span>Nem: %{weather.humidity}</span>
            </div>
            
            <div className="weather-detail-item">
              <span className="weather-detail-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <span>Basınç: {weather.pressure} hPa</span>
            </div>
            
            <div className="weather-detail-item">
              <span className="weather-detail-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <span>Hissedilen: {weather.feelsLike}°C</span>
            </div>
          </div>
          
          <div className="weather-forecast">
            {weather.forecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <div className="forecast-day-name">{day.day}</div>
                <div className="forecast-icon">
                  <img src={getWeatherIcon(day.icon)} alt={day.condition} width="32" height="32" />
                </div>
                <div className="forecast-temps">
                  <span className="forecast-high">{day.high}°</span>
                  <span className="forecast-low">{day.low}°</span>
                </div>
                <div className="forecast-condition">{day.condition}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Panel>
  );
};

export default WeatherPanel; 