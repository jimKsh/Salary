import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../Homepage/Homepage.jsx';
import Calculate from '../Claculate/Calculate.jsx';
import History from '../History/History.jsx'
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
