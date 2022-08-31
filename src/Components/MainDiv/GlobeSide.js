import ReactDOM from 'react-dom'
import './GlobeSide.css'
import createGlobe from 'cobe'
import { useEffect, useRef, useState, useContext } from "react";
import {myContext} from './MainDiv.js'


const GlobeSide = () =>{
  const apikey = process.env.REACT_APP_API_KEY;

  const city = useContext(myContext)

  const [lat, setLat] = useState(40.730610);
  const [long, setLong] = useState(-73.935242);
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    
  const canvasRef = useRef();



    const locationToAngles = (lat, long) => {
        return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
      }
      const focusRef = useRef([0, 0])

    useEffect (() =>{
        fetch(url)
            .then(response => response.json())
            .then((data) =>{
              setLat(data.coord.lat);
              setLong(data.coord.lon);
              focusRef.current = locationToAngles(data.coord.lat, data.coord.lon)
            
            }  )
            .catch((err) => console.log(err.message))
    }, [url])
  

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    const doublePi = Math.PI * 2;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 8,
      baseColor: [0.1, 0.1, 0.6],
      markerColor: [0.9, 0.6, 0.1],
      glowColor: [0.1, 0.1, 0.8],
      markers: [
        // latitude, longitude
        { location: [lat, long], size: 0.1 },
       
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = currentPhi;
        state.theta = currentTheta

        const [focusPhi, focusTheta] = focusRef.current
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi
        // Control the speed
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08
        } else {
          currentPhi -= distNegative * 0.08
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08
        state.width = width * 2
        state.height = width * 2

       
      }
    });
    setTimeout(() => canvasRef.current.style.opacity = '1')
    return () => {
      globe.destroy();
    };
  }, [long]);

  return (
    <div id="Canvas-container"> 
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 560, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
}

export default GlobeSide;







