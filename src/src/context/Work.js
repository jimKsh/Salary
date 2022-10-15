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
        console.log('months: ', months)
        saveData(months)
    }, [months])

    console.log(months);

    const addNewMonth = (month) => {
        console.log(`addNewMonth ${month.name}`)
        setMonths((prev)=>{
            const updated = { ...prev }
            updated[month.name]={
                shits: month.shifts,
                workTime: month.workTime,
                salary: month.salary,
                salaryRate: month.salaryRate,
            }
            console.log('updated: ', updated)
            return updated
        })
    }

    const deleteMonth = (month) => {
        console.log(`deleteMonth ${month}`)
        setMonths((prev)=>{
            const updated = { ...prev }
            delete updated[month]
            console.log('updated: ', updated)
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