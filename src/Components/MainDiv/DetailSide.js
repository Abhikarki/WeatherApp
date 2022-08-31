import React, { useState, useEffect, useContext} from 'react'
import ReactDOM from 'react-dom'
import './DetailSide.css'
import {myContext} from './MainDiv.js'

const DetailSide = () =>{
    const apikey = process.env.REACT_APP_API_KEY;
    const [weatherData, setWeatherData] = useState([{}])
    const[getCity, setGetCity] = useState("")
    const [city, setCity] = useContext(myContext)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    // API Call
    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then((data) =>{
          setWeatherData(data)
          setGetCity("")
        }  )
        .catch((err) => console.log(err.message))
      }, [url])


      const change = (event) =>{
        if (event.keyCode === 13){
          setCity(getCity)
        }
      }

      const kelvinToFahrenheit= (kel) =>{
        return ((((kel - 273.15)*9) / 5) + 32).toFixed(1);
      }
    

    return (
        <div className = "detailDiv">
            <div id = 'searchArea'>
            <input className='inputLocation'
                placeholder='Enter City...'
                onChange={e => setGetCity(e.target.value)} 
                value= {getCity}
                onKeyDown = {change}>
    
            </input>
            </div>
            
            
            <div id ='curr'>
               <h3 style={{'fontSize' : '30px'}}>{weatherData.name}</h3>
               {weatherData.main ? <h2 style={{'fontSize' : '50px'}}>{kelvinToFahrenheit(weatherData.main.temp)}&deg;F</h2> : null}
               {weatherData.main ? <p>Feels like {kelvinToFahrenheit(weatherData.main.feels_like)}&deg;F</p> : null}
                
            </div>

            <div id = 'information'>
                <div className = "Info" style={{'marginLeft' : '3%'}}>
                    <div className= "infoCss">
                    Wind<br></br>
                    {weatherData.wind ? <h5>{weatherData.wind.speed}m/s</h5> : null}
                    </div>
                </div>
                <div className ="Info">
                <div className ="infoCss">
                    Pressure<br></br>
                    {weatherData.main ? <h5>{weatherData.main.pressure}hPa</h5> : null}
                    </div>
                </div>
                <div className = 'Info'>
                <div className= "infoCss">
                    Humidity <br></br>
                    {weatherData.main ? <h5>{weatherData.main.humidity}%</h5> : null}
                    </div>
                </div>
            </div>
        </div>

    );
    
}


export default DetailSide;