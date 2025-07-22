// import { useState } from "react"
import { Route, Routes } from 'react-router-dom'
import WeatherApp from './pages/WeatherApp'

function App() {


  
  return (
    <>



      <Routes>
        <Route path={'/'} element={<WeatherApp/>}/>
      </Routes>
    </>
  )
}

export default App
