import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Work from "../../context/Work.jsx";
import { minutesToDuration } from "../../utils/timeDiff.jsx";
import editIcon from '../../assets/edit.svg'
import addIcon from '../../assets/add.svg'
import deleteIcon from '../../assets/delete_forever.svg'
import beforeIcon from '../../assets/navigate_before.svg'
import classes from './History.module.css';

const History = (props) => {
    const { months, deleteMonth, deleteAll } = useContext(Work)
    const navigate = useNavigate();
    const hasData = !!months.length;

    const clearAll = () => {
        if (window.confirm('האם לנקות את כל הרשימה? לא יהיה ניתן לשחזר פעולה זו')) {
            deleteAll();
        }
    }

    const deleteMonthHandler = (monthName) => {
        if (window.confirm('האם למחוק חודש זה? לא יהיה ניתן לשחזר פעולה זו')) {
            deleteMonth(monthName)
        }
    }

    return (
    <div className={classes['container']}>
        <img src={beforeIcon} alt="back" className={classes['back-btn']} onClick={()=>{navigate('/Salary')}}/>
        <h2 className={classes['title']}>היסטוריה</h2>
        {hasData ?
        <table className={classes['table']}>
            <thead>
                <tr>
                    <th>שם</th>
                    <th>שעות חודשיות</th>
                    <th>שכר חודשי</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {months.map((m) => 
                <tr key={m.id}>
                    <td>{m.name}</td>
                    <td>{minutesToDuration(m.workTime)}</td>
                    <td>{m.salary} ש"ח</td>
                    <td><img src={editIcon} width={18} height={18} alt="edit" onClick={()=>{navigate(`/Salary/calculate?${m.id}`)}}/></td>
                    <td><img src={deleteIcon} width={18} height={18} onClick={()=>{deleteMonthHandler(m.id)}} alt="delete"/></td>
                </tr>)}
            </tbody>
        </table>:
        <div className={classes['no-data']}>אין מידע שמור</div>}
        <button className={classes['add-btn']} onClick={()=>{navigate('/Salary/calculate')}}>הוספת חודש <img src={addIcon} width={18} height={18} alt="add"/></button>
        { hasData &&<button className={classes['delete-btn']} onClick={clearAll}>נקה הכל <img src={deleteIcon} width={18} height={18} alt="delete"/></button>}
    </div>)
}

export default History;