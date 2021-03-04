import React, {useState} from 'react';
import keys from './key';
import './Weather.css';

const api = {
    key: keys.API_KEY,
    base: keys.BASE_URL
  }


export default function Weather() {
    
    const dataBuild = (d) => {
        let date = String(new window.Date());
        date = date.slice(3, 15);
        return date;
    }

    const [query, setQuery] = useState("");
    const [weathers, setWeathers] = useState({});
    const search = (e) => {
        if(e.key === "Enter"){
          fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
          .then((res) => res.json())
          .then((results)=>{
              setQuery("");
              setWeathers(results);
              console.log(results);
          })  
        }
    }

    return (
        <div className={
            typeof weathers.main != "undefined"
            ? weathers.main.temp > 18 
              ? "Weather hot" 
              : "Weather snow" 
            : "Weather"
        }>
            <main>
                <div className="search-container">
                    <input type="text" 
                    placeholder="search"
                    className="search-bar"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    onKeyPress={search}/>
                </div>
                {typeof weathers.main != "undefined" ? ( 
                <div>    
                    <div className="location-container">
                        <div className="location">
                            {weathers.name}, {weathers.sys.country}
                        </div>
                        <div className="date">{dataBuild(new Date())}</div>
                        </div>
                        <div className="weather-container">
                            <div className="temperature">
                                {Math.round(weathers.main.temp)}°C
                            </div>
                        <div className="weather">{weathers.weather[0].main}</div>
                        <div className="weather">{weathers.weather[0].description}</div>
                    </div>
                </div>
                ) : (
                    ""
                )}
            </main>
        </div>
    )
}

