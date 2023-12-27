import classes from "./BusSearch.module.css";
import React, { useState } from "react";
import cities from "../Data/cities.json";
import Title from "./Animation/title";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import CircularProgress from "@mui/material/CircularProgress";

const BusSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchTerm2, setSearchTerm2] = useState(null);
  const [load, setLoad] = useState(false);

  const handleInputChange = (event, newValue) => {
    setSearchTerm(newValue);
  };

  const handleInputChange2 = (event, newValue) => {
    setSearchTerm2(newValue);
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    setLoad(true);
    console.log({ searchTerm, searchTerm2 });
    const response = await fetch(
      `/api/fetch?from=${searchTerm}&to=${searchTerm2}`
    );
    const jsonData = await response.json();
    if (response.status === 200) {
      setLoad(false);
      console.log(jsonData);
      props.getData(jsonData);
    } else {
      console.log(jsonData.msg);
      setLoad(false);
    }
  };
  const swap = () => {
    const newVar = searchTerm;
    setSearchTerm(searchTerm2);
    setSearchTerm2(newVar);
  };
  const styles = {
    width: 300,
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      borderColor: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
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
            className={classes.Autocomplete}
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
