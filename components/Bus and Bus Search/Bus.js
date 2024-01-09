import React, { useState } from "react";
import classes from "./Bus.module.css";
import Ticket from "../Ticket page/Ticket";
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

const Bus = (props) => {
  const [SeletedBus, setSelectedBus] = useState([]);
  const [TicketWindow, setTicketWindow] = useState(false);
  const [open, setOpen] = useState(false);

  const ViewTicket = (item) => {
    setSelectedBus(item);
    setTicketWindow(!TicketWindow);
    setOpen(!open);
  };
  return (
    <div>
      <center>
        <p className={classes.header}>
          Total number of search results: {props.values.length}
        </p>
      </center>
      {props.values &&
        props.values.length > 0 &&
        props.values.map((item) => (
          <div className={classes.container} key={item._id}>
            <div>
              <div className={classes.top}>
                <div style={{ margin: "7px 15px" }}> {item.BusName}</div>
                <div style={{ margin: "7px 15px" }}>
                  <span>{item.Source} </span> <TrendingFlatIcon />
                  <span> {item.Destination}</span>
                </div>
              </div>
              <div className={classes.bottom}>
                <div className={classes.div1} style={{ margin: "0px 15px" }}>
                  <div>
                    <span>Departure Time: </span>
                    <span style={{ fontWeight: "bolder" }}>
                      {item.Departure}
                    </span>
                  </div>

                  <div>
                    <span>Arrival Time:</span>
                    <span style={{ fontWeight: "bold" }}>{item.Arrival}</span>
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
                      color: "#141538",
                      width: "70%",
                    }}
                  ></div>
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
                        color: "lightgreen",
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
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      className={classes.btn}
                      onClick={() => ViewTicket(item)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {TicketWindow && (
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <Ticket close={ViewTicket} Data={SeletedBus} date={props.date} />
        </Backdrop>
      )}
    </div>
  );
};

export default Bus;
