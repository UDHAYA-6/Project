import React from "react";
import classes from "./Legand.module.css";
const Legand = () => {
  return (
    <div className={classes.legand}>
      <div className={classes.legandBox}>
        <div className={classes.avl}></div>
        <div>Available</div>
      </div>
      <div className={classes.legandBox}>
        <div className={classes.female}></div>
        <div>Female seats</div>
      </div>
      <div className={classes.legandBox}>
        <div className={classes.booked}></div>
        <div>Booked seats</div>
      </div>
    </div>
  );
};

export default Legand;
