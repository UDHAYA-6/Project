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
        <div>Booked Female</div>
      </div>
      <div className={classes.legandBox}>
        <div className={classes.booked}></div>
        <div>Booked Male</div>
      </div>
      <div className={classes.legandBox}>
        <div className={classes.Reserved}></div>
        <div>Female Seats</div>
      </div>
    </div>
  );
};

export default Legand;
