import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from '../Homepage/Homepage';
import Calculate from '../Claculate/Calculate';
import History from '../History/History'
import './App.css';

function App() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <Routes>
      <Route path='/' element={<Homepage />}></Route>
      <Route path='/calculate' element={<Calculate />}></Route>
      <Route path='/history' element={<History />}></Route>
    </Routes>
  );
}

export default App;
