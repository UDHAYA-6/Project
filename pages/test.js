import * as React from "react";
import classes from "../styles/Home.module.css";

export default function HorizontalCard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        maxWidth: 700,
        maxHeight: 200,
        backgroundColor: "lightgray",
      }}
    >
      <img
        width={250}
        src="https://img.freepik.com/free-vector/travel-background-hand-drawn-style_23-2147764817.jpg?w=740&t=st=1704359392~exp=1704359992~hmac=3b6010d3e0d296f8981e23841e6ce5ccb73277ef189d175853cbc36bf9035b88"
        alt="Bus image"
      />
      <div className={classes.div}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <span>Source: </span>
            <span>Chennai</span>
          </div>
          <div>
            <span>Tirutani express</span>
          </div>
          <div>
            <span>Destination:</span>
            <span>Salem</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <span>Departure Time: </span>
            <span>12:23</span>
          </div>
          <div>
            <span>Arrival Time: </span>
            <span>12:21</span>
          </div>
        </div>
      </div>
    </div>
  );
}
