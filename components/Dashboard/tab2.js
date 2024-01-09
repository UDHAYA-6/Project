import React, { useState } from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Head from "./tab2head";
import AdminBooking from "./AdminBooking";
import CustomizedSnackbars from "@/components/Snackbar/Alert";
const Tab2 = (props) => {
  const Data2 = props.dt;

  const [snackbarInfo, setSnackbarInfo] = useState(null);
  const [show, setshow] = useState(false);
  const [seat_num, setSeat_num] = useState("");
  const [Id, setId] = useState("");

  const Booking = (num) => {
    setshow(true);
    setSeat_num(num);
    setId(Data2._id);
  };

  const GetValue = (val) => {
    setshow(val);
    setSeat_num("");
    setId("");
  };

  const Release = async (num) => {
    const response = await fetch("api/book", {
      method: "PUT",
      body: JSON.stringify({ seatNumber: num, Id: Data2._id }),
      headers: { "Content-Type": "application/json" },
    });
    const jsonData = await response.json();
    if (response.status === 200) {
      alert("Seat booked successfully");
      setSnackbarInfo({ type: "success", message: jsonData.msg });
    } else {
      setSnackbarInfo({ type: "error", message: jsonData.msg });
    }
  };
  console.log("data2", Data2);
  return (
    <Paper sx={{ overflow: "hidden", width: 1200 }}>
      {show && <AdminBooking value={GetValue} seat={seat_num} ID={Id} />}
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <Head />
          <TableBody>
            <TableRow>
              <h5>Lower Seater Deck</h5>
            </TableRow>
            {Data2.Seats.Lower.Seater.map((seat, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={seat.seat_num}>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">{seat.seat_num}</TableCell>
                <TableCell align="right">{seat.seatStatus}</TableCell>
                <TableCell align="right">
                  {seat.seatStatus !== "Available"
                    ? seat.passengerDetails.name
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  {seat.seatStatus !== "Available"
                    ? seat.passengerDetails.age
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  {seat.seatStatus !== "Available"
                    ? seat.passengerDetails.gender
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="warning"
                    variant="outlined"
                    disabled={seat.seatStatus != "Available" ? false : true}
                    onClick={() => Release(seat.seat_num)}
                  >
                    Release
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="success"
                    variant="outlined"
                    disabled={seat.seatStatus == "Available" ? false : true}
                    onClick={() => Booking(seat.seat_num)}
                  >
                    Book seat
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <h5>Lower Sleeper Deck</h5>
            </TableRow>
            {Data2.Seats.Lower.sleeper.map((seat, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={seat.seat_num}>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">{seat.seat_num}</TableCell>
                <TableCell align="right">{seat.seatStatus}</TableCell>
                <TableCell align="right">
                  {seat.seatStatus !== "Available"
                    ? seat.passengerDetails.name
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  {seat.seatStatus !== "Available"
                    ? seat.passengerDetails.age
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  {seat.seatStatus !== "Available"
                    ? seat.passengerDetails.gender
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="warning"
                    variant="outlined"
                    disabled={seat.seatStatus != "Available" ? false : true}
                    onClick={() => Release(seat.seat_num)}
                  >
                    Release
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="success"
                    variant="outlined"
                    onClick={() => Booking(seat.seat_num)}
                    disabled={seat.seatStatus == "Available" ? false : true}
                  >
                    Book seat
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <h5>Upper Right Deck</h5>
            </TableRow>
            {Data2.Seats.Upper.Right.map((seat, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={seat.seat_num}>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">{seat.seat_num}</TableCell>
                <TableCell align="right">{seat.seatStatus}</TableCell>
                <TableCell align="right">
                  {seat.seatStatus !== "Available"
                    ? seat.passengerDetails.name
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  {seat.seatStatus !== "Available"
                    ? seat.passengerDetails.age
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  {seat.seatStatus !== "Available"
                    ? seat.passengerDetails.gender
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="warning"
                    variant="outlined"
                    disabled={seat.seatStatus != "Available" ? false : true}
                    onClick={() => Release(seat.seat_num)}
                  >
                    Release
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="success"
                    variant="outlined"
                    onClick={() => Booking(seat.seat_num)}
                    disabled={seat.seatStatus == "Available" ? false : true}
                  >
                    Book seat
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <h5>Upper Left Deck</h5>
            </TableRow>
            {Data2.Seats.Upper.Left.map((seat, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={seat.seat_num}>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">{seat.seat_num}</TableCell>
                <TableCell align="right">{seat.seatStatus}</TableCell>
                <TableCell align="right">
                  {seat.seatStatus !== "Available"
                    ? seat.passengerDetails.name
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  {seat.seatStatus !== "Available"
                    ? seat.passengerDetails.age
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  {seat.seatStatus !== "Available"
                    ? seat.passengerDetails.gender
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="warning"
                    variant="outlined"
                    disabled={seat.seatStatus != "Available" ? false : true}
                    onClick={() => Release(seat.seat_num)}
                  >
                    Release
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="success"
                    variant="outlined"
                    onClick={() => Booking(seat.seat_num)}
                    disabled={seat.seatStatus == "Available" ? false : true}
                  >
                    Book seat
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {snackbarInfo && (
        <CustomizedSnackbars
          type={snackbarInfo.type}
          message={snackbarInfo.message}
        />
      )}
    </Paper>
  );
};

export default Tab2;
