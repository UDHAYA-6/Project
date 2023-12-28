import React, { useState } from "react";
import classes from "./Gender.module.css";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const GenderForm = (props) => {
  const [Disable, setDisable] = useState(true);
  const [Description, SetDescription] = useState(false);
  const GenderSelected = (event) => {
    event.preventDefault();
    SetDescription(true);
    props.Show(true);
    props.male(Number(male));
    props.female(Number(female));
  };

  const updateDisableState = (male, female) => {
    const total = parseInt(male) + parseInt(female);
    if (total <= 5 && total > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };
  const [male, setMale] = useState("");
  const [female, setFemale] = useState("");
  const handleChange1 = (event) => {
    setMale(event.target.value);
    SetDescription(false);
    updateDisableState(event.target.value, female);
  };
  const handleChange2 = (event) => {
    setFemale(event.target.value);
    SetDescription(false);
    updateDisableState(event.target.value, male);
  };
  return (
    <div className={classes.div}>
      <form onSubmit={GenderSelected} className={classes.form}>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Male</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={male}
              onChange={handleChange1}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label1">Female</InputLabel>
            <Select
              labelId="demo-simple-select-label1"
              id="demo-simple-select1"
              value={female}
              onChange={handleChange2}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Button
            disabled={Disable}
            variant="contained"
            size="medium"
            type="submit"
          >
            Continue
          </Button>
        </FormControl>
      </form>
      <div>
        {Description && (
          <center>
            You can book total of {Number(male) + Number(female)}
            seats
          </center>
        )}
      </div>
    </div>
  );
};

export default GenderForm;
