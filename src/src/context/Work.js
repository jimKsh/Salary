import { createContext, useEffect, useState } from "react";

const Work = createContext({
    months: {},
    addNewMonth: (month)=>{},
    deleteMonth: (month)=>{},
    deleteAll: ()=>{},
})


const loadData = () => {
    const rowData = localStorage.getItem('data');
    return JSON.parse(rowData);
}

const saveData = (data) => {
    localStorage.setItem('data', JSON.stringify(data))
}

const WorkProvider = (props)=>{
    const [months, setMonths] = useState(loadData() || {})

    useEffect(()=>{
        saveData(months)
    }, [months])

    const addNewMonth = (month) => {
        setMonths((prev)=>{
            const updated = { ...prev }
            updated[month.name]={
                shits: month.shifts,
                workTime: month.workTime,
                salary: month.salary,
                salaryRate: month.salaryRate,
            }
            return updated
        })
    }

    const deleteMonth = (month) => {
        setMonths((prev)=>{
            const updated = { ...prev }
            delete updated[month]
            return updated
        })
    }

    const deleteAll = () => {
        setMonths({})
    }

    return (
    <Work.Provider value={{
        months,
        addNewMonth,
        deleteMonth,
        deleteAll
    }} >
        {props.children}
    </Work.Provider>)
}


export default Work
export { WorkProvider };