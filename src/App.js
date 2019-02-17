import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './css/weather-icons.min.css';
import weatherIcon from './weatherIcon.json';
import AnimeIcon from './components/AnimeIcon';

function App() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState({ });
    const [weatherCondition, setWeatherCondition] = useState('');
    const [conditionIcon, setConditionIcon] = useState('');
    const [forcastFiveDays, setForcastFiveDays] = useState({});
    const animeMap = [1,2,3,4,5,6,7,8];

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
        setConditionIcon('');
      }
    }, [weatherData])

    useEffect(() => {
      let classIcon = '';
      if (weatherCondition.id !== undefined) {
        classIcon = 'wi wi-';
        console.log("Classicon", classIcon);
        if (weatherCondition.id <= 699 || (weatherCondition.id >= 800 && weatherCondition.id <= 899) || weatherCondition.id >= 1000) {
          classIcon = classIcon + 'day-' + weatherIcon[weatherCondition.id].icon;
          console.log("Classicon", classIcon);
        } else {
          classIcon = classIcon + weatherIcon[weatherCondition.id].icon;
        }
      }
      console.log("Classicon", classIcon);
      setConditionIcon(classIcon);
    }, [weatherCondition])

    useEffect(() => {
      if (weatherData.id !== undefined) {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
          params: {
            id: weatherData.id,
            lang: "fr",
            units: "metric",
            appid: '294100e637f9637abde3127eb97060c3'
          }
        })
        .then((response) => {
          console.log(response);
          let just3days = [];
          just3days.push(response.data.list[8]);
          just3days.push(response.data.list[16]);
          just3days.push(response.data.list[24]);
          console.log("3 days: ", just3days);
          setForcastFiveDays(just3days);
        })
        // echec
        .catch((error) => {
          console.error(error);
          setForcastFiveDays({});
        });
      }
    }, [weatherData.id])

    return (
      <div className="App">
        <div className="Meteo-title">
          <h1>Météo avec Hooks</h1>
        </div>
        <div className="Meteo-container">
            <div className="Meteo-container-backgroundAnim">
              {animeMap.map((i) => (
                <AnimeIcon 
                  conditionIcon={conditionIcon} 
                  key={i}
                  number={i}
                />
              ))}
            </div>
          <div className="Meteo-form">
            <p className="Meteo-form-title">Entrer votre ville</p>
            <input
              className="Meteo-form-input"
              placeholder="Tourcoing"
              value={city}
              onChange={handleChangeCity}
              onKeyPress={handleSearchResult}
            />
            { weatherCondition.id !== undefined && weatherData.main !== undefined && forcastFiveDays[0] !== undefined ?
              <div className="Meteo-form-result">
                <div className="Meteo-form-result-now">
                  <h2>Météo actuelle</h2>
                  <i className={`wi wi-day-${weatherIcon[weatherCondition.id].icon}`}></i>
                  <p>{weatherCondition.description}</p>
                  <p>{Math.round(weatherData.main.temp)}°C</p>
                </div>
                <div className="Meteo-form-result-3days">
                  <h2>Les 3 jours suivants</h2>
                    <div className="Meteo-form-result-3days-container">
                    { forcastFiveDays.map((day, i) => (
                      <div className="Meteo-form-result-3days-one">
                        <h3>J+{i+1}</h3>
                        <i className={`wi wi-day-${weatherIcon[forcastFiveDays[i].weather[0].id].icon}`}></i>
                        <p>{forcastFiveDays[i].weather[0].description}</p>
                        <p>{Math.round(forcastFiveDays[i].main.temp)}°C</p>
                      </div>
                    ))}
                    </div>
                </div>
              </div>
            : <div className="Meteo-form-noresult"></div>
            }
          </div>
        </div>
        <div className="Meteo-footer">
            <p>Réalisé avec l'API <a href="https://openweathermap.org/">OpenWeatherMap</a>. Projet disponible sur <a href="https://github.com/TristanTouchain/test-hooks-react-meteo">GitHub.</a></p>
            <p>Réalisé par Tristan Touchain - <a href="https://tristan-touchain.me">tristan-touchain.me</a></p>
        </div>
      </div>
    );
}

export default App;
