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
const AdminBoard = () => {
  const [value, setValue] = useState("1");

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const [Data, setData] = useState([]);
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

  return (
    <>
      <ButtonAppBar />
      <Box sx={{ width: "60%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Available Buses" value="1" />
              <Tab label="Edit Bus" value="2" />
              <Tab value="3" label="ADD NEW BUS"></Tab>
            </TabList>
          </Box>
          <TabPanel value="1">
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
                            onClick={EditClick}
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
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">
            <Button>Add bus</Button>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default AdminBoard;
