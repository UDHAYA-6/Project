import React, { use, useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import classes from "./tab3.module.css";
import CustomizedSnackbars from "@/components/Snackbar/Alert";
import { UpdateBusStructure } from "../Common utilities/Helper Functions/Functions";
import { style } from "@mui/system";
const Tab3 = () => {
  const [Seat, setSeat] = useState("");
  const [Via, setVia] = useState([]);
  const [snackbarInfo, setSnackbarInfo] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [Bus_no, setBus_no] = useState("");
  const [Source, setSource] = useState("");
  const [Destination, setDestination] = useState("");
  const [UpperPrice, setUpperPrice] = useState("");
  const [LowerSleeper, setLowerSleeper] = useState("");
  const [LowerSeater, setLowerSeater] = useState("");
  const [BusName, setBusName] = useState("");
  const [Arrival, setArrival] = useState("");
  const [Departure, setDeparture] = useState("");
  const FormSubmit = async (event) => {
    event.preventDefault();
    const dt = UpdateBusStructure(
      Bus_no,
      BusName,
      Arrival,
      Departure,
      LowerSeater,
      LowerSleeper,
      UpperPrice,
      Source,
      Destination,
      Via
    );
    console.log(dt);
    const response = await fetch("api/bus", {
      method: "POST",
      body: JSON.stringify({ dt }),

      headers: { "Content-Type": "application/json" },
    });
    const jsonData = await response.json();
    console.log(jsonData);
    console.log(response);
    if (response.status === 200) {
      alert("Successfully added");
      setSnackbarInfo({ type: "success", message: jsonData.msg });
      setSeat("");
      setVia([]);
      setInputValue("");
      setBus_no("");
      setSource("");
      setBusName("");
      setDestination("");
      setUpperPrice("");
      setLowerSleeper("");
      setLowerSeater("");
      setArrival("");
      setDeparture("");
    } else {
      setSnackbarInfo({ type: "error", message: jsonData.msg });
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
  const align = { margin: "1rem" };

  return (
    <form onSubmit={FormSubmit}>
      <div className={classes.form}>
        <div className={classes.div1}>
          <TextField
            label="Bus Number"
            variant="standard"
            required
            value={Bus_no}
            style={align}
            onChange={(event) => setBus_no(event.target.value)}
          />
          <TextField
            label="Bus Name"
            variant="standard"
            required
            value={BusName}
            style={align}
            onChange={(event) => setBusName(event.target.value)}
          />
          <TextField
            label="Source"
            variant="standard"
            required
            value={Source}
            style={align}
            onChange={(event) => setSource(event.target.value)}
          />
          <TextField
            label="Destination"
            variant="standard"
            value={Destination}
            required
            style={align}
            onChange={(event) => setDestination(event.target.value)}
          />
          <FormControl sx={{ minWidth: 180 }} style={align} variant="standard">
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
            style={align}
            onChange={(event) => setLowerSeater(event.target.value)}
          />
          <TextField
            sx={{ minWidth: 120 }}
            label="Departure "
            variant="standard"
            required
            value={Departure}
            type="time"
            style={align}
            onChange={(event) => setDeparture(event.target.value)}
          />
          <TextField
            required
            value={LowerSleeper}
            label="Lower Sleeper Price"
            variant="standard"
            style={align}
            onChange={(event) => setLowerSleeper(event.target.value)}
          />
          <TextField
            sx={{ minWidth: 120 }}
            variant="standard"
            label="Arrival"
            required
            value={Arrival}
            type="time"
            style={align}
            onChange={(event) => setArrival(event.target.value)}
          />
          <TextField
            required
            value={UpperPrice}
            label="Upper Deck Price"
            variant="standard"
            style={align}
            onChange={(event) => setUpperPrice(event.target.value)}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Via Routes"
              variant="standard"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={align}
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
      {snackbarInfo && (
        <CustomizedSnackbars
          type={snackbarInfo.type}
          message={snackbarInfo.message}
        />
      )}
    </form>
  );
};

export default Tab3;
