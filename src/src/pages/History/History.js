import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Work from "../../context/Work";
import { minutesToDuration } from "../../utils/timeDiff";
import editIcon from '../../assets/edit.svg'
import addIcon from '../../assets/add.svg'
import deleteIcon from '../../assets/delete_forever.svg'
import beforeIcon from '../../assets/navigate_before.svg'
import classes from './History.module.css';

const History = (props) => {
    const { months, deleteMonth, deleteAll } = useContext(Work)
    const navigate = useNavigate();
    const hasData = !!Object.keys(months).length;


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
                {Object.keys(months).map((k) => 
                <tr key={k}>
                    <td>{k}</td>
                    <td>{minutesToDuration(months[k].workTime)}</td>
                    <td>{months[k].salary} ש"ח</td>
                    <td><img src={editIcon} width={18} height={18} alt="edit"/></td>
                    <td><img src={deleteIcon} width={18} height={18} onClick={()=>{deleteMonthHandler(k)}} alt="delete"/></td>
                </tr>)}
            </tbody>
        </table>:
        <div className={classes['no-data']}>אין מידע שמור</div>}
        <button className={classes['add-btn']} onClick={()=>{navigate('/calculate')}}>הוספת חודש <img src={addIcon} width={18} height={18} alt="add"/></button>
        { hasData &&<button className={classes['delete-btn']} onClick={clearAll}>נקה הכל <img src={deleteIcon} width={18} height={18} alt="delete"/></button>}
    </div>)
}

export default History;