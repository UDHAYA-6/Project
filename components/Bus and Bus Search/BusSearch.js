import classes from "./BusSearch.module.css";
import React, { useState } from "react";
import cities from "@/components/Common utilities/Data/cities.json";
import Title from "../Common utilities/Animation/title";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import CircularProgress from "@mui/material/CircularProgress";
import { styles } from "../Common utilities/Helper Functions/Functions";

const BusSearch = (props) => {
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const oneMonthLater = new Date();
  oneMonthLater.setMonth(today.getMonth() + 1);
  const maxDate = oneMonthLater.toISOString().split("T")[0];
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchTerm2, setSearchTerm2] = useState(null);
  const [load, setLoad] = useState(false);
  const [Datee, setDate] = useState("");

  const handleInputChange = (event, newValue) => {
    setSearchTerm(newValue);
  };

  const handleInputChange2 = (event, newValue) => {
    setSearchTerm2(newValue);
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    setLoad(true);
    const response = await fetch(
      `/api/fetch?from=${searchTerm}&to=${searchTerm2}`
    );
    const jsonData = await response.json();
    if (response.status === 200) {
      setLoad(false);
      props.getData(jsonData);
      props.getDate(Datee);
    } else {
      alert(jsonData.msg);
      setLoad(false);
    }
  };
  const swap = () => {
    const newVar = searchTerm;
    setSearchTerm(searchTerm2);
    setSearchTerm2(newVar);
  };

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.curve}>
          <div className={classes.textBox1}>
            <span>
              Fast, Secure, and Effortless: Your Ticket to Travel Happiness
            </span>
            <p>
              Effortless travel planning starts here! Book your E-ticket
              instantly and embark on a journey of simplicity and speed
            </p>
          </div>
          <Title />
        </div>
      </div>
      <div className={classes.right}>
        <form className={classes.form} onSubmit={formSubmit}>
          <Autocomplete
            disablePortal
            options={cities}
            sx={styles}
            value={searchTerm}
            onChange={handleInputChange}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="From"
                required
                InputLabelProps={{ sx: { fontSize: "1.3rem" } }}
              />
            )}
          />
          <center>
            <SwapVertIcon
              className={classes.swap}
              fontSize="large"
              color="primary"
              onClick={swap}
            ></SwapVertIcon>
          </center>
          <Autocomplete
            disablePortal
            className={classes.Autocomplete}
            options={cities}
            sx={styles}
            value={searchTerm2}
            onChange={handleInputChange2}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="To"
                required
                InputLabelProps={{ sx: { fontSize: "1.3rem" } }}
              />
            )}
          />
          <TextField
            sx={styles}
            type="date"
            value={Datee}
            style={{ marginBottom: "2rem" }}
            required
            onChange={() => setDate(event.target.value)}
            className={classes.Autocomplete}
            InputProps={{
              inputProps: {
                min: minDate,
                max: maxDate,
              },
            }}
          />
          <Button
            variant="contained"
            className={classes.submit}
            startIcon={!load ? <SearchIcon /> : ""}
            type="submit"
          >
            {!load ? (
              "Search"
            ) : (
              <>
                Seaching.. <CircularProgress size={22} color="inherit" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BusSearch;
