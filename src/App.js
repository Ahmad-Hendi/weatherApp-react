import React, { useState } from 'react';




{/* open weather API */}

  // const api =  {
  //   key: "9a4775ff72454cf544a15e1a2d53a366",
  //   base: "http://api.openweathermap.org/data/2.5/weather?q=Paris&appid="
  // }

  // const search = evt => {
  //   if (evt.key === "Enter")
  //   fetch(`${api.base}${api.key}`)
  //   .then(res => res.json())
  //   .then(data => {
  //   console.log(data);
  // })
  // }

  const api = {
    key: "9a4775ff72454cf544a15e1a2d53a366",
    base: "http://api.openweathermap.org/data/2.5/"
  }

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});


  

  
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    };
  };


  
  // defining date Builder to call later
  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 
                  'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 
                  'November', 'December'];

    let days = ['Sunday', 'Monday', 'Tuesday',
                'Wednesday', 'Thursday',
                'Friday', 'Saturday'];

    let day = days[d.getDay()]; // method returns the day of the week for the specified date according to local time where 0 represents Sunday
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  } 





  return (
    <div className={ 
      (typeof weather.main != 'undefined')
       ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app' }>
      <main>
         <div className="search-box">  
            <input
              type="text"
              className="search-bar"
              placeholder="Search.."
              onChange={e => setQuery(e.target.value)}
              value={query} // the city or the country
              onKeyPress={search}
            />
         </div>  
         {(typeof weather.main != 'undefined' ) ? (
         <div>
           <div className="location-box">
         <div className="location">{weather.name} {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
        </div>   
        <div className="weather-box">
          <div className="temp">
          {Math.round(weather.main.temp)}ºc
          </div>
         <div className="weather">{weather.weather[0].description}</div>
       </div>
         </div>
       ): ('')}
      </main>
    </div>
  );
}

export default App;
