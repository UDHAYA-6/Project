import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import {
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
const AdminBooking = (props) => {
  const [open, setOpen] = useState(true);
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [seatNumber, setSeatNumber] = useState(props.seat);

  const handleClose = () => {
    setOpen(false);
    props.value(false);
  };
  console.log(props.ID);
  const BookTickets = async (event) => {
    event.preventDefault();
    const newFormData = [{ seatNumber, name, age, gender }];
    const response = await fetch("api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Get: newFormData, id: props.ID }),
    });
    const jsonData = await response.json();
    if (response.status === 200) {
      alert(jsonData.msg);
      props.value(false);
      setOpen(false);
    } else {
      alert(jsonData.msg);
    }
  };
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <form
        onSubmit={BookTickets}
        style={{
          width: "fit-content",
          height: "fit-content",
          backgroundColor: "white",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          borderRadius: "7px",
        }}
      >
        <center style={{ color: "green", margin: "0.5rem 0px" }}>
          seat Number: LS76
        </center>
        <TextField
          label="Passenger Name"
          variant="outlined"
          style={{ marginBottom: "0.8rem" }}
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="Passenger Age"
          variant="outlined"
          type="number"
          required
          value={age}
          onChange={(event) => setAge(event.target.value)}
          style={{ marginBottom: "0.8rem" }}
        />

        <FormControl sx={{ minWidth: 150 }} style={{ marginBottom: "0.8rem" }}>
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            required
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Button
            color="error"
            variant="contained"
            sx={{ minWidth: 40 }}
            size="small"
            onClick={handleClose}
            style={{ marginRight: "0.5rem" }}
          >
            Exit
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ minWidth: 40 }}
            size="small"
          >
            Book
          </Button>
        </div>
      </form>
    </Backdrop>
  );
};

export default AdminBooking;
