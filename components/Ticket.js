import React, { useState } from "react";
import classes from "./Ticket.module.css";
const Ticket = (props) => {
  const data = props.Data;
  console.log(data);
  const [MaleCount, setMaleCount] = useState(0);
  const [FemaleCount, setFemaleCount] = useState(0);
  const [Disable, setDisable] = useState(true);
  const [Show, setShow] = useState(false);
  const GenderSelected = (event) => {
    event.preventDefault();
    if (!Disable) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const closeWindow = () => {
    props.close();
  };
  const MaleChange = (event) => {
    setMaleCount(event.target.value);
    if (
      parseInt(event.target.value) + parseInt(FemaleCount) <= 5 &&
      parseInt(event.target.value) + parseInt(FemaleCount) !== 0
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };
  const FemaleChange = (event) => {
    setFemaleCount(event.target.value);
    if (
      parseInt(event.target.value) + parseInt(MaleCount) <= 5 &&
      parseInt(event.target.value) + parseInt(MaleCount) !== 0
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };
  const SelecetedSeats = (event, no) => {};
  return (
    <div className={classes.div}>
      <div className={classes.div1}>
        <span>Chennai Express</span>
        <span>{props.Data.Bus_no}</span>
        <span onClick={closeWindow}>X</span>
      </div>
      <div className={classes.div2}>
        <div className={classes.left}>
          <form onSubmit={GenderSelected}>
            <span>Select No of seats:</span>
            <span className={classes.selector}>
              Male:
              <input
                type="number"
                required
                min={0}
                max={5}
                onChange={MaleChange}
                placeholder="Select male"
              />
            </span>
            <span className={classes.selector}>
              Female:
              <input
                type="number"
                required
                onChange={FemaleChange}
                min={0}
                max={5}
                placeholder="Select female"
              />
            </span>
            <span className={classes.selector}>
              <button
                disabled={Disable}
                className={Disable ? classes.disable : classes.abled}
                type="submit"
              >
                Continue
              </button>
            </span>
          </form>
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
          <div className={`${classes.UpperDeck} ${!Show ? classes.dis : " "}`}>
            <div>hello</div>
            <div className={classes.UpperSeats}>
              {data.Seats.Lower.Seater.map((seat) => (
                <div
                  key={seat.seat_num}
                  className={`${classes.seater} ${
                    seat.seatStatus === "Booked" ? classes.Booked : " "
                  }`}
                >
                  {seat.seat_num}
                  {seat.seatStatus === "Available" && (
                    <input
                      type="checkbox"
                      onChange={() => SelecetedSeats(seat.seat_num)}
                    />
                  )}
                </div>
              ))}

              {data.Seats.Lower.sleeper.map((seat) => (
                <div
                  key={seat.seat_num}
                  className={`${classes.sleeper} ${
                    seat.seatStatus === "Booked" ? classes.Booked : " "
                  }`}
                >
                  {seat.seat_num}
                  {seat.seatStatus === "Available" && (
                    <input
                      type="checkbox"
                      onChange={() => SelecetedSeats(seat.seat_num)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={`${classes.LowerDeck} ${!Show ? classes.dis : " "}`}>
            {data.Seats.Upper.Right.map((seat) => (
              <div
                key={seat.seat_num}
                className={`${classes.sleeper} ${
                  seat.seatStatus === "Booked" ? classes.Booked : " "
                }`}
              >
                {seat.seat_num}
                {seat.seatStatus === "Available" && (
                  <input
                    type="checkbox"
                    onChange={() => SelecetedSeats(seat.seat_num)}
                  />
                )}
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
