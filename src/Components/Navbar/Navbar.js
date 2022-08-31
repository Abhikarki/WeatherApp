import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './Navbar.css'
import {Link} from 'react-router-dom'


const Navbar = () =>{
    const [clicked, setClicked] = useState(false);

    const handleClick = () =>{
        setClicked(!clicked);
    }

    return (

        <nav className = 'Navbar'>
            
           <h1 style={{color : '#008080'}}>WeatherApp</h1>
           <div className='logo'>
                <i className="fa-solid fa-w"></i>
           </div>
           <div className='menu-icon' onClick={handleClick}>
               <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
           </div>
           
           <ul className={clicked ? 'navmenu active' : 'navmenu'}>
            
                <li style = {{marginTop : '7px'}}><Link to = '/'>Home</Link></li>
                <li style = {{marginTop : '7px'}}><Link to = '/about'>About</Link></li>
                <li style = {{marginTop : '7px'}}><Link to = '/globe'>Globe</Link></li>
                <li>
                    <a href='https://github.com/Abhikarki/WeatherApp/tree/master'><button className='searchButton' style={{color : 'white'}}> Github </button></a>
                </li>
                
            </ul> 
           
        </nav>
    )
}

export default Navbar;