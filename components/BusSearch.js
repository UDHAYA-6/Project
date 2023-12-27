import classes from "./BusSearch.module.css";
import React, { useState } from "react";
import cities from "../Data/cities.json";
import Title from "./Animation/title";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";

const BusSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [load, setLoad] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredCities2, setFilteredCities2] = useState([]);
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = cities.filter((city) =>
      city.toLowerCase().startsWith(term.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleInputChange2 = (e) => {
    const term = e.target.value;
    setSearchTerm2(term);
    const filtered = cities.filter((city) =>
      city.toLowerCase().startsWith(term.toLowerCase())
    );
    setFilteredCities2(filtered);
  };

  const handleCitySelect2 = (city) => {
    setSearchTerm2(city);
    setFilteredCities2([]);
  };

  const handleCitySelect = (city) => {
    setSearchTerm(city);
    setFilteredCities([]);
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    setLoad(true);
    const response = await fetch(
      `/api/fetch?from=${searchTerm}&to=${searchTerm2}`
    );
    const jsonData = await response.json();
    if (response.status === 200) {
      console.log(jsonData);
      props.getData(jsonData);
      setLoad(false);
    } else {
      console.log(jsonData.msg);
      setLoad(false);
    }
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
            id="combo-box-demo"
            options={cities}
            sx={{ width: 300 }}
            onChange={handleInputChange}
            renderInput={(params) => <TextField {...params} label="From" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cities}
            onChange={handleInputChange2}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="To" />}
          />

          <Button type="submit">Search</Button>

          {/* <div className={classes.div}>
            <label>From</label>
            <input
              type="text"
              placeholder="From"
              value={searchTerm}
              required
              onChange={handleInputChange}
            />
            {searchTerm.length > 0 && (
              <ul className={classes.ul}>
                {filteredCities.map((city) => (
                  <li
                    className={classes.li}
                    key={city}
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={classes.div}>
            <label>To</label>
            <input
              type="text"
              placeholder="To"
              value={searchTerm2}
              onChange={handleInputChange2}
              required
            />
            {searchTerm2.length > 0 && (
              <ul className={classes.ul}>
                {filteredCities2.map((city) => (
                  <li
                    className={classes.li}
                    key={city}
                    onClick={() => handleCitySelect2(city)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={classes.div}>
            <label>Date of Journey</label>
            <input type="date" required />
          </div>
          <center>
            <Button type="submit">Search</Button>
          </center> */}
        </form>
      </div>
    </div>
  );
};

export default BusSearch;
