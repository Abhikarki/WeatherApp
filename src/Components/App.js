import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Navbar/Navbar'
import './App.css'
import './MainDiv/MainDiv'
import MainDiv from './MainDiv/MainDiv.js'
import {Route, Routes} from "react-router-dom"
import About from './Pages/About'
import Globe from './Pages/Globe'

const App = () =>{
   
    return(
        <div className='mainClass'>
           
        <Navbar />
        <Routes>
            <Route path='/' element = {<MainDiv />}></Route>
            <Route path='/about' element = {<About />}></Route>
            <Route path='/globe' element = {<Globe />}></Route>
        </Routes>
       
        </div>
            )
}

export default App;