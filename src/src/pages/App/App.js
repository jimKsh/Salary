import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from '../Homepage/Homepage';
import Calculate from '../Claculate/Calculate';
import History from '../History/History'
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/Salary' element={<Homepage />}></Route>
      <Route path='/Salary/calculate' element={<Calculate />}></Route>
      <Route path='/Salary/history' element={<History />}></Route>
    </Routes>
  );
}

export default App;
