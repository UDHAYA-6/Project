import React, { useEffect, useState } from "react";
import ButtonAppBar from "@/components/Genral NavBar/nav";
import { getSession, useSession } from "next-auth/react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

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
const history = () => {
  const { data: session } = useSession();
  const [CurrentSession, setCurrentSession] = useState();
  const [Data, setData] = useState([]);

  useEffect(() => {
    const funct = async () => {
      const userSession = await getSession();
      setCurrentSession(userSession);
      if (userSession) {
        const response = await fetch("api/history", {
          method: "POST",
          body: JSON.stringify({ Email: userSession.session.user.email }),
          headers: { "Content-Type": "application/json" },
        });
        const jsonData = await response.json();

        if (response.status === 200) {
          setData(jsonData);
        } else {
          alert("Error in retriving user booking history");
        }
      } else {
        setData("no booking histroy available");
      }
    };
    funct();
  }, [session]);

  const TableContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    height: "100%",
  });

  const Release = async (num, id) => {
    const response = await fetch("api/book", {
      method: "PUT",
      body: JSON.stringify({ seatNumber: num, Id: id }),
      headers: { "Content-Type": "application/json" },
    });
    const jsonData = await response.json();
    if (response.status === 200) {
      alert(jsonData.msg);
    } else {
      alert(jsonData.msg);
    }
  };
  return (
    <>
      <ButtonAppBar />
      {Data.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 1200 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>S.No</StyledTableCell>
                <StyledTableCell>Seat Number</StyledTableCell>
                <StyledTableCell>Bus Name</StyledTableCell>
                <StyledTableCell align="right">Passenger Name</StyledTableCell>
                <StyledTableCell align="right">
                  Passenger Gender
                </StyledTableCell>
                <StyledTableCell align="right">Passenger Age</StyledTableCell>
                <StyledTableCell align="right">Date of Journey</StyledTableCell>
                <StyledTableCell align="right">Source</StyledTableCell>
                <StyledTableCell align="right">Destintaion</StyledTableCell>
                <StyledTableCell align="right">Cancellation</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "white" }}>
              {Data[0].History ? (
                Data[0].History.reverse().map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.seatNumber}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.bus_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.name}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item.gender}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.age}</StyledTableCell>
                    <StyledTableCell align="right">{item.date}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item.source}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.destination ? item.destination : "salem"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {new Date(item.date) > new Date() ? (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => Release(item.seatNumber, item.id)}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button disabled={true}>Cancel</Button>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <center>
                  <h1>No bookings so far</h1>
                </center>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default history;
