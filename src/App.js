
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// import './App.css';

function App () {
  

  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  const apiKey = '1c5087f4009179a220e79cfce223c7ef';
  const date = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  const time = new Date().toLocaleTimeString();

  const callWeather = async (e) => {
    e.preventDefault()
    const loc = e.target.elements.loc.value;
    const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + loc + "&units=imperial&appid=" +apiKey;
    const req = axios.get(url);
    const res = await req;
    setWeather({
        descp: res.data.weather[0].description,
        temp: res.data.main.temp,
        city: res.data.name,
        humidity: res.data.main.humidity,
        feelsLike: res.data.main.feels_like,
        hiTemp: res.data.main.temp_max,
        loTemp: res.data.main.temp_min,
        speed: res.data.wind.speed
    })

    setCity(res.data.name)

    }


    const Weath = () => {
      
      return (
      <div className="weather">
        <div className="citydate">
            <h2 className="city">{city}</h2>
            <div className="date"><p className='day'>{date}</p><p className="time">{time}</p>
            </div>
      </div>
      <div className="conditionIconInfo">
            <div className="currentTemp">
              <p>{Math.round(weather.temp)}°</p>
              </div>
                
                    <img src="http://openweathermap.org/img/wn/04d.png" className="conditionIcons" alt="Picture"/>
            </div>
            <div className="info">{weather.descp}</div>
        <hr/>
        <div className="hilo">
            <div className="tempHi"><p>H: {Math.round(weather.hiTemp)}°</p></div>
            <div className="tempLo"><p>L: {Math.round(weather.loTemp)}°</p></div>
        </div>
        <div className="other">
            <div className="feels_like">Feels like: {Math.round(weather.feelsLike)}°</div>
            <div className="humidity"><p>Humidity: {Math.round(weather.humidity)}%</p></div>
        </div>
        <div className="windSpeed">Wind Speed: {Math.round(weather.speed)} mph</div>
          
     </div>
      )
      }
      return (
       
        
  <div className="buttonContainer">
      <form className='form' onSubmit={callWeather}>
        <div className="button">
          <input type="text" className="submission" placeholder="Search Zipcodes" name="loc"/>
          <button className="prettyButton">Weather</button>
        </div>
      </form>

    {weather && <Weath />}

    {/* <div><button className="check">Click Me To Get Celsius</button></div> */}

   </div>
 
      )
}
      
export default App;
