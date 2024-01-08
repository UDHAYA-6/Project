import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
const Tab1 = (props) => {
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
    props.Id(id);
  };

  const DeleteClick = async (id) => {
    const response = await fetch("api/bus", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    const jsonData = await response.json();
    if (response.status === 200) {
      alert(jsonData.msg);
    } else {
      alert(jsonData.msg);
    }
  };
  const Data = props.dt;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S.No</StyledTableCell>
            <StyledTableCell align="left">Bus Number</StyledTableCell>
            <StyledTableCell align="left">Source</StyledTableCell>
            <StyledTableCell align="left">Destination</StyledTableCell>
            <StyledTableCell align="left">Total Seats</StyledTableCell>
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
                <StyledTableCell align="left">{item.Bus_no}</StyledTableCell>
                <StyledTableCell align="left">{item.Source}</StyledTableCell>
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
                    onClick={() => DeleteClick(item._id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tab1;
