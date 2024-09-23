import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';

// 1. 앱이 실행되자마자 현재 위치기반의 날씨가 보인다.
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태
// 3. 5개의 버튼이 있다.(1개는 현재 위치, 4개는 다른 도시)
// 4. 도시버튼을 클릭할 때 마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 우르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const cities = ['seoul', 'paris', 'new york', 'tokyo'];
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log('latitude', position.coords.latitude);
      console.log('longitude', position.coords.longitude);
      getWeatherByCurrentLocation(lat, lon);
      getForecastByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c9792bc12eb95e4185894e1f54c03eb5&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log('data', data);
    setWeather(data);
    setLoading(false);
  };
  const getForecastByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c9792bc12eb95e4185894e1f54c03eb5`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log('data2', data);
    setLoading(false);
  };

  const getWeatherByCityName = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c9792bc12eb95e4185894e1f54c03eb5&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };
  useEffect(() => {
    if (city === '') getCurrentLocation();
    else getWeatherByCityName(city);
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            setCity={setCity}
            getCurrentLocation={getCurrentLocation}
          />
        </div>
      )}
    </div>
  );
}

export default App;
