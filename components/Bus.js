import React, { useState } from "react";
import classes from "./Bus.module.css";
import Ticket from "./Ticket";
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import MovingIcon from "@mui/icons-material/Moving";

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
        <h1>Total number of search results: {props.values.length}</h1>
      </center>
      {props.values &&
        props.values.length > 0 &&
        props.values.map((item) => (
          <div className={classes.container} key={item._id}>
            {/* <div>
              <img
                height={150}
                width={150}
                style={{ borderTopLeftRadius: "100px" }}
                src="https://img.freepik.com/free-vector/city-bus-stop-flat-poster_1284-8899.jpg?w=740&t=st=1704362261~exp=1704362861~hmac=4f0fd51d7da3f08403a875702626baba0822c30005c72ef2213d553311dd37dc"
              />
            </div> */}
            <div>
              <div className={classes.top}>
                <div style={{ margin: "0px 15px" }}> Tiruchendure Express</div>
                <div style={{ margin: "0px 15px" }}>
                  <span>{item.Source} </span> <MovingIcon />
                  <span> {item.Destination}</span>
                </div>
              </div>
              <div className={classes.bottom}>
                <div className={classes.div1} style={{ margin: "0px 15px" }}>
                  <div>
                    <span>Departure Time: </span>
                    <span style={{ fontWeight: "bolder" }}>08:50</span>
                  </div>

                  <div>
                    <span>Arrival Time:</span>
                    <span style={{ fontWeight: "bold" }}>10:55</span>
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
          <Ticket close={ViewTicket} Data={SeletedBus} />
        </Backdrop>
      )}
    </div>
  );
};

export default Bus;
