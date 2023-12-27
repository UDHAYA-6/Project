import React, { useState } from "react";
import classes from "./Gender.module.css";
const GenderForm = (props) => {
  const [MaleCount, setMaleCount] = useState(0);
  const [FemaleCount, setFemaleCount] = useState(0);
  const [Disable, setDisable] = useState(true);
  const [Description, SetDescription] = useState(false);
  const GenderSelected = (event) => {
    event.preventDefault();
    SetDescription(true);
    props.Show(true);
    props.male(Number(MaleCount));
    props.female(Number(FemaleCount));
  };
  const MaleChange = (event) => {
    setMaleCount(event.target.value);
    SetDescription(false);
    updateDisableState(event.target.value, FemaleCount);
  };

  const FemaleChange = (event) => {
    setFemaleCount(event.target.value);
    SetDescription(false);
    updateDisableState(MaleCount, event.target.value);
  };
  const updateDisableState = (maleCount, femaleCount) => {
    const total = parseInt(maleCount) + parseInt(femaleCount);
    setDisable(total <= 0 || total > 5);
  };
  return (
    <div className={classes.div}>
      <form onSubmit={GenderSelected} className={classes.form}>
        <span>Select No of seats:</span>
        <span className={classes.selector}>
          Male:
          <input
            type="number"
            required
            min={0}
            max={5}
            onChange={MaleChange}
            defaultValue={0}
          />
        </span>
        <span className={classes.selector}>
          Female:
          <input
            type="number"
            required
            onChange={FemaleChange}
            min={0}
            max={5}
            defaultValue={0}
          />
        </span>
        <span className={classes.selector}>
          <button
            disabled={Disable}
            className={Disable ? classes.disable : classes.abled}
            type="submit"
          >
            Continue
          </button>
        </span>
      </form>
      <div>
        {Description && (
          <center>
            You can book total of {Number(MaleCount) + Number(FemaleCount)}
            seats
          </center>
        )}
      </div>
    </div>
  );
};

export default GenderForm;
