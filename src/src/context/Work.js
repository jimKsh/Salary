import { createContext, useEffect, useState } from "react";

const Work = createContext({
    months: {},
    addNewMonth: (month)=>{},
    deleteMonth: (month)=>{},
    deleteAll: ()=>{},
    editMonth: (month)=>{}
})


const loadData = () => {
    const rowData = localStorage.getItem('months');
    const data = JSON.parse(rowData);

    return data
}

const saveData = (data) => {
    localStorage.setItem('months', JSON.stringify(data))
}

const getRandomId = () => Math.random().toString().slice(2)

const WorkProvider = (props)=>{
    const [months, setMonths] = useState(loadData() || [])

    useEffect(()=>{
        saveData(months)
    }, [months])

    const addNewMonth = (month) => {
        setMonths((prev)=>(
            [...prev, {
                id: getRandomId(),
                name: month.name,
                shifts: month.shifts,
                workTime: month.workTime,
                salary: month.salary,
                salaryRate: month.salaryRate,
            }]
        ))
    }

    const deleteMonth = (id) => {
        setMonths((prev)=>{
            const updated = prev.filter((m)=>(m.id!==id))
            return updated
        })
    }

    const deleteAll = () => {
        setMonths([])
    }

    const editMonth = (month) => {
        setMonths((prev)=>(
            prev.reduce((t, c)=>{ 
                if (c.id === month.id) {
                    return [...t, month]
                }
                return [...t, c]
              }, [])
        ))
    }

    return (
    <Work.Provider value={{
        months,
        addNewMonth,
        deleteMonth,
        deleteAll,
        editMonth
    }} >
        {props.children}
    </Work.Provider>)
}


export default Work
export { WorkProvider };