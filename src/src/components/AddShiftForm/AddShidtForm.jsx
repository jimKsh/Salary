import React, { useRef, useState } from "react";
import classes from './AddShidtForm.module.css'

const AddShidtForm = (props) => {
  const [invalidAlert, setInvalidAlert] = useState('')
  const dayInput = useRef();
  const startInput = useRef();
  const endInput = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const day = parseInt(dayInput.current.value);
    const start = startInput.current.value
    const end = endInput.current.value
    
    if (day === '' || day < 1 || day > 31 || start === '' || end === '') {
      setInvalidAlert('אנא הכנס נתונים');
      return;
    }

    if (start > end) {
      setInvalidAlert('אנא הזן שעות תקינות');
      return;
    }
    
    const res = props.onSubmit({
      day: day, start: start, end: end
    });

    if (res !== '') {
      setInvalidAlert(res);
    }
  }

  const resetHandler = () => {
    setInvalidAlert('');
  }

  return (
    <form
      className={classes["add-shift-form"]}
      onSubmit={submitHandler}
    >
      {invalidAlert !== '' && <span className={classes['alert']}>{invalidAlert}</span>}
      <div className={classes["input-container"]}>
        <label>יום</label>
        <input type="number" defaultValue={props.editData?.day} ref={dayInput}/>
      </div>
      <div className={classes["input-container"]}>
        <label>שעת התחלה</label>
        <input type="time" defaultValue={props.editData?.start} ref={startInput}/>
      </div>
      <div className={classes["input-container"]}>
        <label>שעת סיום</label>
        <input type="time" defaultValue={props.editData?.end} ref={endInput}/>
      </div>
      <button type="submit" className={classes["add-btn"]}>
        שמור
      </button>
      <button type="reset" className={classes["add-btn"]} onClick={resetHandler}>
        נקה
      </button>
      <button
        className={classes["add-btn"]}
        onClick={() => {
          props.back(false);
        }}
      >
        בטל
      </button>
    </form>
  );
};

export default AddShidtForm;
