import React from 'react';

const WeatherBox = ({ weather }) => {
  console.log('weather?', weather);

  return (
    <div className="weather-box">
      <div className="location">{weather?.name}</div>
      <h2>{weather?.main.temp}</h2>
      <h3>{weather?.weather[0].description}</h3>
      <img
        src={
          weather &&
          `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        }
      />
    </div>
  );
};

export default WeatherBox;
