import { useState } from 'react'
import './App.css'
import find from './assets/Search.jpg';
import sun from './assets/SunIcon.png';
import snow from './assets/SnowIcon.png';
const WeatherDetails = ({icon , temp , city , country , lat , log}) =>{
 return(
   <>
  <div className="Images">
    <img src={icon} alt="Image" className="w-20 h-20"/>
  </div>
  <div className="Temperature font-bold text-3xl">{temp}°C 
  </div>
  <div className="Location text-blue-700 font-semibold text-2xl ">{city}</div>
  <div className="Country font-extrabold">{country}</div>
  <div className='flex justify-between w-full mt-4'>
  <div >
    <span className="Lat">Latitude</span><br></br>
    <span className='flex flex justify-center'>{lat}</span>
    </div>
     <div >
    <span className="Log">Longitude</span><br></br>
    <span className='flex flex justify-center'>{log}</span>  
    </div>
 </div>
  </>
 )
}
function App() {
  const [icon , setIcon] = useState(snow);
  const [temp , setTemp] = useState(0);
  const [city , setCity] = useState("Chennai");
  const [country , setCountry] = useState("India");
  const [lat , setLat] = useState(0);
  const [log , setLog] = useState(0);
  return (
    <div className="bg-gray-400 w-full min-h-screen flex justify-center items-center">
  <div className="bg-white w-80 rounded-2xl p-6 shadow-lg flex flex-col items-center">
            <form className="relative w-64">
  <input
    type="text"
    placeholder="Enter City Name"
    className="border-2 rounded-2xl p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <img
    src={find} 
    alt="Search"
    className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 "
  />
</form><br></br>

      <WeatherDetails  icon={icon} temp={temp} city ={city} country ={country} lat={lat} log={log}/>
      </div>
    </div>
  )
}

export default App
