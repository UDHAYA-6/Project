import React, { useEffect, useState } from "react";
import ButtonAppBar from "../Admin from/nav2";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
const AdminBoard = () => {
  const [value, setValue] = useState("1");
  const [Data, setData] = useState([]);
  const [Data2, setData2] = useState([]);

  const handleChange = (event, event2) => {
    console.log(event2);
    console.log(typeof event2);
    setData2([]);
    setValue(event2);
  };
  useEffect(() => {
    const funct = async () => {
      const response = await fetch("api/bus", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonData = await response.json();

      if (response.status === 200) {
        setData(jsonData);
        console.log(jsonData);
      } else {
        console.log(jsonData.msg);
      }
    };
    funct();
  }, []);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const EditClick = (id) => {
    setValue("2");
    const Filter = Data.filter((item) => item._id == id);
    setData2(Filter);
  };
  console.log("Data", Data2);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const styles = {
    backgroundColor: "gray",
    color: "black",
  };
  return (
    <>
      <ButtonAppBar />
      <Box sx={{ width: "60%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="ALL BUSES" value="1" />
              <Tab label="EDIT BUS" value="2" />
              <Tab label="ADD NEW BUS" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>S.No</StyledTableCell>
                      <StyledTableCell align="left">Bus Number</StyledTableCell>
                      <StyledTableCell align="left">Source</StyledTableCell>
                      <StyledTableCell align="left">
                        Destination
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Total Seats
                      </StyledTableCell>
                      <StyledTableCell align="left">Edit Bus</StyledTableCell>
                      <StyledTableCell align="left">Delete Bus</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Data.length > 0 &&
                      Data.map((item, index) => (
                        <StyledTableRow key={item._id}>
                          <StyledTableCell component="th" scope="row">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {item.Bus_no}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {item.Source}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {item.Destination}
                          </StyledTableCell>
                          <StyledTableCell align="left">{40}</StyledTableCell>
                          <StyledTableCell align="left">
                            <Button
                              variant="contained"
                              color="warning"
                              startIcon={<EditIcon />}
                              size="small"
                              onClick={() => EditClick(item._id)}
                            >
                              Edit
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <Button
                              variant="contained"
                              color="error"
                              startIcon={<DeleteIcon />}
                              size="small"
                            >
                              Delete
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            }
          </TabPanel>
          <TabPanel value="2">
            {Data2.length > 0 ? (
              <Paper sx={{ overflow: "hidden", width: 1400 }}>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={styles} align="right">
                          S.No
                        </TableCell>
                        <TableCell style={styles} align="right">
                          Seat Number
                        </TableCell>
                        <TableCell style={styles} align="right">
                          Seat Status
                        </TableCell>
                        <TableCell style={styles} align="right">
                          Passenger Name
                        </TableCell>
                        <TableCell style={styles} align="right">
                          Passenger Age
                        </TableCell>
                        <TableCell style={styles} align="right">
                          Passenger Gender
                        </TableCell>
                        <TableCell style={styles} align="right">
                          Cancel Ticket
                        </TableCell>
                        <TableCell style={styles} align="right">
                          Book Ticket
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <h5>Lower Seater Deck</h5>
                      </TableRow>
                      {Data2[0].Seats.Lower.Seater.map((seat, index) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={seat.seat_num}
                        >
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
                              disabled={
                                seat.seatStatus != "Available" ? false : true
                              }
                            >
                              Release
                            </Button>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              color="success"
                              variant="outlined"
                              disabled={
                                seat.seatStatus == "Available" ? false : true
                              }
                            >
                              Book seat
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <h5>Lower Sleeper Deck</h5>
                      </TableRow>
                      {Data2[0].Seats.Lower.sleeper.map((seat, index) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={seat.seat_num}
                        >
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
                        </TableRow>
                      ))}
                      <TableRow>
                        <h5>Upper Right Deck</h5>
                      </TableRow>
                      {Data2[0].Seats.Upper.Right.map((seat, index) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={seat.seat_num}
                        >
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
                        </TableRow>
                      ))}
                      <TableRow>
                        <h5>Upper Left Deck</h5>
                      </TableRow>
                      {Data2[0].Seats.Upper.Left.map((seat, index) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={seat.seat_num}
                        >
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={40}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
              </Paper>
            ) : (
              <h2>No bus is selected</h2>
            )}
          </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default AdminBoard;
