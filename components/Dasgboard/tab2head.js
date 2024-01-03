import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Head = () => {
  const styles = {
    backgroundColor: "green",
    color: "white",
  };
  return (
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
  );
};

export default Head;
