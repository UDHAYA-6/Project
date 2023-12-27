import React, { useState } from "react";
import classes from "./Gender.module.css";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const GenderForm = (props) => {
  const [MaleCount, setMaleCount] = useState(null);
  const [FemaleCount, setFemaleCount] = useState(null);
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
  const top100Films = [0, 1, 2, 3, 4, 5];
  return (
    <div className={classes.div}>
      <form onSubmit={GenderSelected} className={classes.form}>
        <span>Select No of seats:</span>

        <div>
          <Autocomplete
            disablePortal
            options={top100Films}
            sx={{
              width: "80px",
              "& .MuiOutlinedInput-root": { fontSize: "0.3rem" },
            }}
            value={MaleCount}
            onChange={MaleChange}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Male"
                required
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            )}
          />
        </div>

        <div>
          <Autocomplete
            className={classes.Autocomplete}
            disablePortal
            options={top100Films}
            sx={{
              width: "80px",
              "& .MuiOutlinedInput-root": { fontSize: "0.3rem" },
            }}
            value={FemaleCount}
            onChange={FemaleChange}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Female"
                required
                InputLabelProps={{ sx: { fontSize: "0.8rem" } }}
              />
            )}
          />
        </div>
        <div>
          <Button variant="contained" disabled={Disable} type="submit">
            Continue
          </Button>
        </div>
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
