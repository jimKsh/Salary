import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hoursDiff, minutesToDuration } from '../../utils/timeDiff'
import editIcon from '../../assets/edit.svg'
import addIcon from '../../assets/add.svg'
import deleteIcon from '../../assets/delete_forever.svg'
import saveIcon from '../../assets/save.svg'
import beforeIcon from '../../assets/navigate_before.svg'
import AddShidtForm from "../../components/AddShiftForm/AddShidtForm";
import Work from "../../context/Work";
import classes from './Calculate.module.css';


const Calculate = (props) => {
    const [addMode, setAddMode] = useState(false)
    const [data, setData] = useState([])
    const [salaryRate, setSalaryRate] = useState(0)
    const { addNewMonth } = useContext(Work)
    const navigate = useNavigate()

    const addShiftSubmitHandler = (newShift) => {
        // check day already added
        const sameDay = data.filter((s) => s.day === newShift.day)
        if (sameDay.length) {
            return 'קיימת משמרת בתאריך זה';
        }

        newShift['diff'] = hoursDiff(newShift.start, newShift.end)
        newShift['duration'] = minutesToDuration(newShift['diff'])

        setData(prev=>{
            const newData = [...prev, newShift];
            return newData.sort((a, b) => (a.day - b.day))
        });
        setAddMode(false);
        return '';
    }

    const totalDiff = () => {
        return data.reduce((t, s)=>(t + s.diff), 0)
    }

    const clearAll = () => {
        if (window.confirm('האם לנקות את כל הרשימה? לא יהיה ניתן לשחזר פעולה זו')) {
            setData([])
        }
    }

    const saveMonth = () => {
        const monthName = prompt('Month Name');
        addNewMonth({name: monthName, shifts: data, workTime: totalDiff(), salary: totalDiff()/60*30, salaryRate})
    }

    const salaryRateChangeHandler = (e) => {
        setSalaryRate(e.target.value)
    }

    return (
    <div className={classes['container']}>
        <img src={beforeIcon} alt="back" className={classes['back-btn']} onClick={()=>{navigate('/')}}/>
        <h2 className={classes['title']}>חישוב משכורת</h2>
        {!!data.length ?
        <table className={classes['table']}>
            <thead>
                <tr>
                    <th>יום</th>
                    <th>התחלה</th>
                    <th>סיום</th>
                    <th>משך</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((d) => 
                <tr key={d.day}>
                    <td>{d.day}</td>
                    <td>{d.start}</td>
                    <td>{d.end}</td>
                    <td>{d.duration}</td>
                    <td><img src={editIcon} width={18} height={18} alt="edit"/></td>
                </tr>)}
            </tbody>
        </table>:
        <div className={classes['no-data']}>נא להוסיף משמרת</div>}
        <div className={classes['input-container']}>
            <label>שכר לשעה</label>
            <input type="number" value={salaryRate} onChange={salaryRateChangeHandler}/>
        </div>
        { addMode ?
        <AddShidtForm back={setAddMode} onSubmit={addShiftSubmitHandler}/> :
        <>
            <button className={classes['add-btn']} onClick={()=>{setAddMode(true)}}>הוספת משמרת <img src={addIcon} width={18} height={18} alt="add"/></button>
            {!!data.length && <button className={classes['delete-btn']} onClick={clearAll}>נקה הכל <img src={deleteIcon} width={18} height={18} alt="delete"/></button>}
            {!!data.length && <button className={classes['save-btn']} onClick={saveMonth}>שמור <img src={saveIcon} width={18} height={18} alt="save"/></button>}
        </>
        }
        {!!data.length && 
        <div className={classes['total']}>
            <div>שעות חודשיות {minutesToDuration(totalDiff())}</div>
            <div>שכר חודשי {totalDiff()/60*salaryRate} ש"ח</div>
        </div>}
    </div>)
}

export default Calculate;