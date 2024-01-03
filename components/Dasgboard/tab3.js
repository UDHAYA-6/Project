import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import classes from "./tab3.module.css";
import { UpdateBusStructure } from "../Helper Functions/Functions";
const Tab3 = () => {
  const [Seat, setSeat] = useState("");
  const [Via, setVia] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [Bus_no, setBus_no] = useState("");
  const [Source, setSource] = useState("");
  const [Destination, setDestination] = useState("");
  const [UpperPrice, setUpperPrice] = useState("");
  const [LowerSleeper, setLowerSleeper] = useState("");
  const [LowerSeater, setLowerSeater] = useState("");

  const FormSubmit = async (event) => {
    event.preventDefault();
    const dt = UpdateBusStructure(
      Bus_no,
      LowerSeater,
      LowerSleeper,
      UpperPrice,
      Source,
      Destination,
      Via
    );
    console.log(dt);
    const response = await fetch("api/insert", {
      method: "POST",
      body: JSON.stringify({ dt }),

      headers: { "Content-Type": "application/json" },
    });
    const jsonData = await response.json();
    console.log(jsonData);
    console.log(response);
    if (response.status === 200) {
      alert(jsonData.msg);
      setSeat("");
      setVia([]);
      setInputValue("");
      setBus_no("");
      setSource("");
      setDestination("");
      setUpperPrice("");
      setLowerSleeper("");
      setLowerSeater("");
    } else {
      alert(jsonData.msg + response);
    }
  };
  const handleAddVia = () => {
    if (inputValue.trim() !== "" && !Via.includes(inputValue)) {
      setVia([...Via, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveVia = (movie) => {
    const updatedVia = Via.filter((m) => m !== movie);
    setVia(updatedVia);
  };

  return (
    <form onSubmit={FormSubmit}>
      <div className={classes.form}>
        <div className={classes.div1}>
          <TextField
            label="Bus Number"
            variant="standard"
            required
            value={Bus_no}
            className={classes.field}
            onChange={(event) => setBus_no(event.target.value)}
          />
          <TextField
            label="Source"
            variant="standard"
            required
            value={Source}
            className={classes.field}
            onChange={(event) => setSource(event.target.value)}
          />
          <TextField
            label="Destination"
            variant="standard"
            value={Destination}
            required
            className={classes.field}
            onChange={(event) => setDestination(event.target.value)}
          />
          <FormControl
            sx={{ minWidth: 180 }}
            className={classes.field}
            variant="standard"
          >
            <InputLabel>Total Seats</InputLabel>
            <Select
              value={Seat}
              label="Select Count"
              required
              onChange={(event) => setSeat(event.target.value)}
            >
              <MenuItem value={40}>40</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.div2}>
          <TextField
            required
            value={LowerSeater}
            label="Lower Seater Price"
            variant="standard"
            className={classes.field}
            onChange={(event) => setLowerSeater(event.target.value)}
          />
          <TextField
            required
            value={LowerSleeper}
            label="Lower Sleeper Price"
            variant="standard"
            className={classes.field}
            onChange={(event) => setLowerSleeper(event.target.value)}
          />
          <TextField
            required
            value={UpperPrice}
            label="Upper Deck Price"
            variant="standard"
            className={classes.field}
            onChange={(event) => setUpperPrice(event.target.value)}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Via Routes"
              variant="standard"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={classes.field}
            />
            <Button
              variant="outlined"
              onClick={handleAddVia}
              style={{ marginLeft: "10px" }}
            >
              Add Route
            </Button>
          </div>
          <div style={{ marginTop: "10px" }}>
            {Via.map((item, index) => (
              <Chip
                key={index}
                label={item}
                onDelete={() => handleRemoveVia(item)}
                style={{ margin: "4px" }}
              />
            ))}
          </div>
        </div>
      </div>
      <Button type="submit" color="secondary" size="large" variant="contained">
        Add bus
      </Button>
    </form>
  );
};

export default Tab3;
