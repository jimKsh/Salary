import React from "react";
import { useNavigate } from 'react-router-dom';
import classes from './Homepage.module.css';

const Homepage = (props) => {
    const navigate = useNavigate();
    return (
    <div className={classes['container']}>
        <h1>חישוב משכורת</h1>
        <h3>לפי שעות עבודה ושכר לפי שעה</h3>
        <div className={classes["buttons-container"]}>
            <button onClick={()=>{ navigate('/Salary/calculate')}}>חישוב</button>
            <button onClick={()=>{ navigate('/Salary/history')}}>היסטוריה</button>
        </div>
    </div>)
}

export default Homepage;