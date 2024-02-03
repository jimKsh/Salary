import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App/App.jsx'
import './index.css'
import {WorkProvider} from "./context/Work.jsx";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WorkProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </WorkProvider>
  </React.StrictMode>,
)
