import React from "react";
import classes from "./Ticket.module.css";
const Ticket = (props) => {
  console.log(props.Data);
  const data = props.Data;
  console.log(data.Seats.Lower.Seater);
  console.log(data);
  const closeWindow = () => {
    props.close();
  };
  return (
    <div className={classes.div}>
      <div className={classes.div1}>
        <span>Chennai Express</span>
        <span>{props.Data.Bus_no}</span>
        <span onClick={closeWindow}>X</span>
      </div>
      <div className={classes.div2}>
        <div className={classes.left}>
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
          <div className={classes.UpperDeck}>
            <div>hello</div>
            <div className={classes.UpperSeats}>
              {data.Seats.Lower.Seater.map((seat) => (
                <div key={seat.seat_num} className={classes.seater}>
                  {seat.seat_num}
                  <input type="checkbox" />
                </div>
              ))}

              {data.Seats.Lower.sleeper.map((seat) => (
                <div key={seat.seat_num} className={classes.sleeper}>
                  {seat.seat_num}
                  <input type="checkbox" />
                </div>
              ))}
            </div>
          </div>
          <div className={classes.LowerDeck}>
            {data.Seats.Upper.Right.map((seat) => (
              <div key={seat.seat_num} className={classes.sleeper}>
                {seat.seat_num} <input type="checkbox" />
              </div>
            ))}
          </div>
        </div>
        <div className={classes.right}></div>
      </div>
    </div>
  );
};

export default Ticket;
