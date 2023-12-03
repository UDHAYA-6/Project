import React, { useState } from "react";
import classes from "./Bus.module.css";
import Ticket from "./Ticket";
const Bus = (props) => {
  const [SeletedBus, setSelectedBus] = useState([]);
  console.log(props.values);
  const [TicketWindow, setTicketWindow] = useState(false);
  const ViewTicket = (item) => {
    setSelectedBus(item);
    console.log("selected item:", item);
    setTicketWindow(!TicketWindow);
  };
  return (
    <div>
      <center>
        <h1>Total number of search results: {props.values.length}</h1>
      </center>
      {props.values &&
        props.values.length > 0 &&
        props.values.map((item) => (
          <div className={classes.container} key={item._id}>
            <div className={classes.top}>
              <div>
                <span className={classes.heading}>Source: </span>
                <span>{item.Source}</span>
              </div>
              <div>{item.Bus_no}</div>
              <div>
                <span className={classes.heading}>Destination: </span>
                <span>{item.Destination}</span>
              </div>
            </div>
            <div className={classes.bottom}>
              <div className={classes.div1}>
                <div>
                  <span>Departure Time: </span>
                  <span style={{ fontWeight: "bolder" }}>08:50 AM</span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    Tiruchendure Express
                  </span>
                </div>
                <div>
                  <span>Arrival Time:</span>
                  <span style={{ fontWeight: "bold" }}>10:55 PM</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    fontSize: "1.4rem",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                    color: "#141538",
                    width: "70%",
                  }}
                >
                  <div>
                    <span style={{ color: "black" }}>Duration:</span>
                    <span> 8hrs 40min</span>
                  </div>
                  <div>
                    <span style={{ color: "black" }}>Total seats: </span>
                    <span>{item.Total}</span>
                  </div>
                  <div>
                    <span style={{ color: "black" }}>AVL: </span>
                    <span style={{ color: "green" }}>28</span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "70%",
                    padding: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      color: "#141338",
                    }}
                  >
                    Via:
                  </span>
                  {item.Via.map((via) => (
                    <span style={{ fontSize: "1.2rem" }} key={via}>
                      {via}-
                    </span>
                  ))}
                </div>
                <div>
                  <button
                    className={classes.btn}
                    onClick={() => ViewTicket(item)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      {TicketWindow && <Ticket close={ViewTicket} Data={SeletedBus} />}
    </div>
  );
};

export default Bus;
