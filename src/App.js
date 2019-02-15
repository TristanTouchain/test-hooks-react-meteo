import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './css/weather-icons.min.css';
import weatherIcon from './weatherIcon.json';

function App() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState({ });
    const [weatherCondition, setWeatherCondition] = useState('');

    function handleChangeCity(e) {
      setCity(e.target.value);
    }

    function handleSearchResult(e) {
      if (e.key === 'Enter') {
        axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: city,
            lang: "fr",
            units: "metric",
            appid: '294100e637f9637abde3127eb97060c3'
          }
        })
        .then((response) => {
          console.log(response);
          setWeatherData(response.data);
        })
        // echec
        .catch((error) => {
          console.error(error);
          setWeatherData({});
          console.log(weatherData);
        });
      }
    }
  
    useEffect(() => {
      if (weatherData.weather !== undefined) {
        setWeatherCondition(weatherData.weather[0]);
      } else {
        setWeatherCondition({});
      }
    }, [weatherData])

    return (
      <div className="App">
        <div className="Meteo-title">
          <h1>Météo avec Hooks</h1>
        </div>
        <div className="Meteo-container">
          { weatherCondition.id !== undefined ?
            <div className="Meteo-container-backgroundAnim">
              <div className={`wi wi-${(weatherCondition.id <= 699 || (weatherCondition.id >= 800 && weatherCondition.id <= 899) || weatherCondition.id >= 1000) ? `day-` : ``}${weatherIcon[weatherCondition.id].icon} animate pos1`}></div>
              <div className={`wi wi-${(weatherCondition.id <= 699 || (weatherCondition.id >= 800 && weatherCondition.id <= 899) || weatherCondition.id >= 1000) ? `day-` : ``}${weatherIcon[weatherCondition.id].icon} animate pos2`}></div>
              <div className={`wi wi-${(weatherCondition.id <= 699 || (weatherCondition.id >= 800 && weatherCondition.id <= 899) || weatherCondition.id >= 1000) ? `day-` : ``}${weatherIcon[weatherCondition.id].icon} animate pos3`}></div>
              <div className={`wi wi-${(weatherCondition.id <= 699 || (weatherCondition.id >= 800 && weatherCondition.id <= 899) || weatherCondition.id >= 1000) ? `day-` : ``}${weatherIcon[weatherCondition.id].icon} animate pos4`}></div>
              <div className={`wi wi-${(weatherCondition.id <= 699 || (weatherCondition.id >= 800 && weatherCondition.id <= 899) || weatherCondition.id >= 1000) ? `day-` : ``}${weatherIcon[weatherCondition.id].icon} animate pos5`}></div>
              <div className={`wi wi-${(weatherCondition.id <= 699 || (weatherCondition.id >= 800 && weatherCondition.id <= 899) || weatherCondition.id >= 1000) ? `day-` : ``}${weatherIcon[weatherCondition.id].icon} animate pos6`}></div>
              <div className={`wi wi-${(weatherCondition.id <= 699 || (weatherCondition.id >= 800 && weatherCondition.id <= 899) || weatherCondition.id >= 1000) ? `day-` : ``}${weatherIcon[weatherCondition.id].icon} animate pos7`}></div>
              <div className={`wi wi-${(weatherCondition.id <= 699 || (weatherCondition.id >= 800 && weatherCondition.id <= 899) || weatherCondition.id >= 1000) ? `day-` : ``}${weatherIcon[weatherCondition.id].icon} animate pos8`}></div>
            </div>
            : <div className="Meteo-container-backgroundAnim"></div>
          }
          
          <div className="Meteo-form">
            <p className="Meteo-form-title">Entrer votre ville</p>
            <input
              className="Meteo-form-input"
              placeholder="Tourcoing"
              value={city}
              onChange={handleChangeCity}
              onKeyPress={handleSearchResult}
            />
            { weatherCondition.id !== undefined && weatherData.main !== undefined ?
              <div className="Meteo-form-result">
                <i className={`wi wi-day-${weatherIcon[weatherCondition.id].icon}`}></i>
                <p>{weatherCondition.description}</p>
                <p>{Math.round(weatherData.main.temp)}°C</p>
              </div>
            : <div className="Meteo-form-result"></div>
            }
          </div>
        </div>
      </div>
    );
}

export default App;
