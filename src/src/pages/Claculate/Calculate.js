import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
    const [editMode, setEditMode] = useState(false)
    const [shifts, setShifts] = useState([])
    const [salaryRate, setSalaryRate] = useState(0)
    const [monthName, setMonthName] = useState('')
    const [editShiftData, setEditShiftData] = useState({})
    const [hasChanges, setHasChanges] = useState(false)
    const { addNewMonth, months, editMonth } = useContext(Work)
    const navigate = useNavigate()
    const location = useLocation()
    const [editMonthId, setEditMonthId] = useState('')

    useEffect(()=>{
        const monthId = location.search?.slice(1)
        
        // month id doesn't exist
        if (!monthId) return

        const monthFound = months.filter(m=>m.id===monthId)
        if (monthFound.length === 1) {
            setEditMonthId(monthFound[0].id)
            setShifts(monthFound[0].shifts)
            setSalaryRate(monthFound[0].salaryRate)
            setMonthName(monthFound[0].name)
        }
        
    }, [location, months])

    const addShiftSubmitHandler = (newShift) => {
        // check day already added
        const sameDay = shifts.findIndex((s) => s.day === newShift.day)
        if (sameDay !== -1 && editShiftData.day === undefined) {
            return 'קיימת משמרת בתאריך זה';
        }

        newShift['diff'] = hoursDiff(newShift.start, newShift.end)
        newShift['duration'] = minutesToDuration(newShift['diff'])

        setShifts(prev=>{
            // new shift
            if (editShiftData.day === undefined) {
                const newData = [...prev, newShift];
                return newData.sort((a, b) => (a.day - b.day))
            }

            // update shift
            const newData = [...prev];
            const sameDay = newData.findIndex((s) => s.day === editShiftData.day)
            newData[sameDay] = newShift
            return newData
        });
        setHasChanges(true);
        setEditMode(false);
        return '';
    }

    const totalDiff = () => {
        return shifts.reduce((t, s)=>(t + s.diff), 0)
    }

    const clearAll = () => {
        if (window.confirm('האם לנקות את כל הרשימה? לא יהיה ניתן לשחזר פעולה זו')) {
            setShifts([])
            setMonthName('')
            setSalaryRate(0)
        }
    }

    const saveMonthHandler = () => {
        if (!monthName) {
            alert('שם חודש נדרש לצורך שמירה')
            return
        }
        if (editMonthId !== '') {
            editMonth({id: editMonthId, name: monthName, shifts: shifts, workTime: totalDiff(), salary: (totalDiff()/60*salaryRate).toFixed(2), salaryRate})
        } else {
            addNewMonth({name: monthName, shifts: shifts, workTime: totalDiff(), salary: (totalDiff()/60*salaryRate).toFixed(2), salaryRate})
        }
        navigate('/Salary/history')
    }

    const monthNameChangeHandler = (e) => {
        setMonthName(e.target.value)
        setHasChanges(true)
    }

    const salaryRateChangeHandler = (e) => {
        setSalaryRate(e.target.value)
        setHasChanges(true)
    }

    const editShiftHandler = (day) => {
        const sameDay = shifts.filter((s) => s.day === day)[0]
        setEditShiftData(sameDay)
        setEditMode(true)
        setHasChanges(true)
    }

    const deleteShiftHandler = (day) => {
        if (window.confirm('האם למחוק את המשמרת? לא יהיה ניתן לשחזר פעולה זו')) {
            setShifts(prev=> prev.filter((s)=> (s.day !== day)) )
            setHasChanges(true)
        }
    }

    const closeAddFormHandler = () => {
        setEditMode(false)
        setEditShiftData({})
    }

    const backBtnHandler= () => {
        if (hasChanges) {
            if (!window.confirm('בוצעו שינויים אך לא נשמרו, האם לצאת בכל זאת?')) {
                return
            }
        }
        navigate('/Salary')
    }

    return (
    <div className={classes['container']}>
        <img src={beforeIcon} alt="back" className={classes['back-btn']} onClick={backBtnHandler}/>
        <h2 className={classes['title']}>חישוב משכורת</h2>

        <form className={classes['input-container']} onSubmit={(e)=>e.preventDefault()}>
                <label>שם חודש</label>
                <input type="text" value={monthName} onChange={monthNameChangeHandler}/>
        </form>

        <form className={classes['input-container']} onSubmit={(e)=>e.preventDefault()}>
                <label>שכר לשעה</label>
                <input type="number" value={salaryRate} onChange={salaryRateChangeHandler}/>
        </form>

        {!!shifts.length && 
        <div className={classes['total']}>
            <div>שעות חודשיות {minutesToDuration(totalDiff())}</div>
            <div>שכר חודשי {(totalDiff()/60*salaryRate).toFixed(2)} ש"ח</div>
        </div>}

        {!!shifts.length ?
        <table className={classes['table']}>
            <thead>
                <tr>
                    <th>יום</th>
                    <th>התחלה</th>
                    <th>סיום</th>
                    <th>משך</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {shifts.map((d) => 
                <tr key={d.day}>
                    <td>{d.day}</td>
                    <td>{d.start}</td>
                    <td>{d.end}</td>
                    <td>{d.duration}</td>
                    <td><img src={editIcon} width={18} height={18} alt="edit" onClick={()=>{editShiftHandler(d.day)}}/></td>
                    <td><img src={deleteIcon} width={18} height={18} alt="edit" onClick={()=>{deleteShiftHandler(d.day)}}/></td>
                </tr>)}
            </tbody>
        </table>:
        <div className={classes['no-data']}>נא להוסיף משמרת</div>}

        
        { editMode ?
        <AddShidtForm back={closeAddFormHandler} onSubmit={addShiftSubmitHandler} editData={editShiftData}/> :
        <>
            <button className={classes['add-btn']} onClick={()=>{setEditMode(true)}}>הוספת משמרת <img src={addIcon} width={18} height={18} alt="add"/></button>
            {!!shifts.length && <button className={classes['save-btn']} onClick={saveMonthHandler}>שמור <img src={saveIcon} width={18} height={18} alt="save"/></button>}
            {!!shifts.length && <button className={classes['delete-btn']} onClick={clearAll}>נקה הכל <img src={deleteIcon} width={18} height={18} alt="delete"/></button>}
        </>
        }
        
    </div>)
}

export default Calculate;