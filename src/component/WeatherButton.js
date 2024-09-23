import React from 'react';
import { Button } from 'react-bootstrap';
const WeatherButton = ({ cities, setCity, getCurrentLocation }) => {
  console.log('cities?', cities);

  return (
    <div>
      <Button variant="success" onClick={() => getCurrentLocation()}>
        Current Location
      </Button>
      {cities.map((item, index) => (
        <Button variant="success" key={index} onClick={() => setCity(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
