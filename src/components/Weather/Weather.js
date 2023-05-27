import React from "react";
import classes from "./Weather.module.css";
import { useState, useEffect, useRef } from "react";
const Weather = () => {
  const cityInput = useRef();
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    callWeatherApi();
  }, []);
  const SearchCity = () => {
    callWeatherApi(cityInput.current.value);
  };
  const callWeatherApi = async (city = "tel aviv") => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=19c4ef48fec1e6ebe727e2b9562ad67b&units=metric`
      );
      if (!response.ok) {
        throw new Error("Request Failed!");
      }
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className={classes.weather}>
      <div className={classes.weatherinfo}>
        <div className={classes.searchbar}>
          <input type="text" placeholder="Search your city" ref={cityInput} />
          <button onClick={SearchCity}>Go</button>
        </div>
        {weatherData && (
          <React.Fragment>
            <h3 className={classes.city}>{weatherData.name}</h3>
            <h3 className={`${classes.temp} ${weatherData.main.temp>10&&classes.colortempyellow}`}>{weatherData.main.temp.toFixed(2)}°</h3>
            <label>Min temp: {weatherData.main.temp_min}°</label>
            <label>Max temp: {weatherData.main.temp_max}° </label>
            <br></br>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={`${weatherData.weather[0].icon}@2x.png`}></img>
            <h3>feels like:{weatherData.main["feels_like"]}</h3>
            <h4>Country:{weatherData.sys.country}</h4>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Weather;
