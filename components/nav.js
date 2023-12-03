import React from "react";
import classes from "./nav.module.css";
import { FaBell, FaBus, FaSearch, FaUser } from "react-icons/fa";
const NavBar = () => {
  return (
    <div>
      <nav className={classes.nav}>
        <div className={classes.leftNav}>
          <div>
            <span className={classes.span}>Newton </span>
            <span className={classes.span}>Travels </span>
            <FaBus color="lightblue" />
          </div>
        </div>
        <ul className={classes.ul}>
          <li>View Tickets</li>
          <li>Refund Status</li>
          <li>Cancel Tickets</li>
          <li>Transaction Histroty</li>
        </ul>
        <div className={classes.rightNav}>
          <FaSearch size={16} style={{ opacity: "0.8" }} />
          <input className={classes.search} type="text" placeholder="search" />
          <div className={classes.notification}>
            <FaBell size={19} />
          </div>
          <div style={{ opacity: "0.8" }}>
            <span>
              <FaUser size={19} />
            </span>
            <span style={{ textTransform: "Capitalize", fontSize: "1.3rem" }}>
              {" "}
              Udhaya kumar
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
