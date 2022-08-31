import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App'
import './index.css'
import { HashRouter } from 'react-router-dom'


const reactContentRoot = document.getElementById('root')

ReactDOM.createRoot(reactContentRoot).render(
    <HashRouter>
        <App />
     </HashRouter>
);