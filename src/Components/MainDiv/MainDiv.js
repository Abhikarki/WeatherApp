import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './MainDiv.css'
import  DetailSide from './DetailSide'
import GlobeSide from './GlobeSide'
import { createContext } from 'react'

export const myContext = React.createContext();

const MainDiv = () =>{
    
    const [city , setCity] = useState("New york");
    
    return (
        <myContext.Provider value = {[city, setCity]}>
        <div className='Container'>
            <div className='row'>
            <div className='col-1' style={{width : '6%'}}>
                  
            </div>

            <div className='col-xs-10 col-lg-5' id = 'detailSide'>
                <DetailSide />
            </div>

            <div className='col-xs-10 col-lg-6'  id = "globeSide">
                <GlobeSide />
            </div>

            
        
        </div>
        
        </div>
        </myContext.Provider>   
    )
}

export default MainDiv;

