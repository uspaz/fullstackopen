import axios from "axios";
import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { ListOfCountries } from "./components/ListOfCountries";

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const apiKey = import.meta.env.VITE_API_KEY;
  
  

  useEffect(() => {
    
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then( (res) => {
      setCountries(res.data)
      
    })
  }, [])
  


  function handleFilter(e) {
    const name = e.target.value.toLowerCase();
    setSearchCountry(name)
  }
  
  const filteredCountries = searchCountry
  ? countries.filter( (country) => country.name.common.toLowerCase().includes(searchCountry))
  : countries;
  
  const showCountry = (country) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${apiKey}`)
      .then( res => {
        setSelectedCountry(country)
        setWeather(res.data)
      })
  }

  return (
    <>  
        
      	buscar país: <input type="text" placeholder="Buscar contacto" onChange={handleFilter}/>
        
        {/* Caso 1: Demasiadas coincidencias */}
        {filteredCountries.length > 10 && <p>Demasiadas coincidencias, sea más específico</p>}

        {/* Caso 2: Solo un país encontrado, mostrar directamente */}
        {filteredCountries.length === 1 && (
          <div>
            <h1>{filteredCountries[0].name.common}</h1>
            <p>{filteredCountries[0].capital}</p>
            <ul>
              {Object.values(filteredCountries[0].languages).map((language, i) => (
                <li key={i}>{language}</li>
              ))}
            </ul>
            <img src={filteredCountries[0].flags.png} alt="bandera" />
          </div>
        )}

        {/* Caso 3: Varias coincidencias (máximo 10), mostrar lista con botón */}
        {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
          <ul>
            {filteredCountries.map((country) => (
              <li key={country.name.common}>
                {country.name.common}
                <button onClick={() => showCountry(country)}>show</button>
              </li>
            ))}
          </ul>
        )}

        {/* Mostrar el país seleccionado cuando se presiona el botón */}
        {selectedCountry && (
          <div>
            <h1>{selectedCountry.name.common}</h1>
            <p>{selectedCountry.capital}</p>
            <ul>
              {Object.values(selectedCountry.languages).map((language, i) => (
                <li key={i}>{language}</li>
              ))}
            </ul>
            <img src={selectedCountry.flags.png} alt="bandera" />

            <h2>Clima en {selectedCountry.capital}</h2>
            <p>Temperatura {weather.main.temp}ºC</p>
            <p>Viento a {weather.wind.speed.toFixed(0)} km/h</p>
            <img src={weather.weather.icon} alt="" />
          </div>
        )}

        {/* <ListOfCountries filteredCountry={countries} /> */}

    </>
    );
}

export default App
