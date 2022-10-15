import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Homepage from '../Homepage/Homepage';
import Calculate from '../Claculate/Calculate';
import History from '../History/History'
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />}></Route>
      <Route path='/calculate' element={<Calculate />}></Route>
      <Route path='/history' element={<History />}></Route>
    </Routes>
  );
}

export default App;
