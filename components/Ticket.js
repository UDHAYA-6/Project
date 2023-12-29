import React, { useState } from "react";
import classes from "./Ticket.module.css";
import Legand from "./Legand/Legand";
import GenderForm from "./GenderSelection/GenderForm";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import {
  FormControl,
  TextField,
  Autocomplete,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const Ticket = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [Show, setShow] = useState(false);
  const [PickedSeats, setPickedSeats] = useState([]);
  const [formData, setFormData] = useState([]);
  const [MaleCount, setMaleCount] = useState(0);
  const [FemaleCount, setFemaleCount] = useState(0);
  const [fem, SetFem] = useState([]);
  const data = props.Data;
  // console.log(data);
  const womenLowerSeater = data.Seats.Lower.Seater;
  const LowerSeater = womenLowerSeater
    .filter((item) => {
      return (
        item.seatStatus === "Booked" &&
        item.passengerDetails &&
        item.passengerDetails.gender === "Female"
      );
    })
    .map((femaleSeat) => {
      const seatNumber = femaleSeat.seat_num;
      const prefix = seatNumber.substring(0, 2);
      const numberPart = seatNumber.substring(2);
      const K = Number(numberPart);
      return `${prefix}${K <= 9 ? K + 9 : K - 9}`;
    });

  const womenUpperRightDeck = data.Seats.Upper.Right;
  console.log(womenUpperRightDeck);
  const UpperRight = womenUpperRightDeck
    .filter((item) => {
      return (
        item.seatStatus === "Booked" &&
        item.passengerDetails &&
        item.passengerDetails.gender == "Female"
      );
    })
    .map((femaleSeat) => {
      const seatNumber = femaleSeat.seat_num;
      const prefix = seatNumber.substring(0, 2);
      const numberPart = seatNumber.substring(2);
      const K = Number(numberPart);
      return `${prefix}${K <= 5 ? K + 5 : K - 5}`;
    });
  console.log(UpperRight);
  const ReservedWomenSeats = [...LowerSeater, ...UpperRight];

  console.log("Reserved Women Seats:", ReservedWomenSeats);

  const GetShow = (value) => {
    setShow(value);
  };
  const Male = (count) => {
    setMaleCount(count);
    setPickedSeats([]);
    SetFem([]);
  };
  const Female = (count) => {
    setFemaleCount(count);
    setPickedSeats([]);
    SetFem([]);
  };
  const handleInputChange = (index, fieldName, value) => {
    const updatedData = [...formData];
    updatedData[index] = { ...updatedData[index], [fieldName]: value };
    setFormData(updatedData);
  };
  const closeWindow = () => {
    setPickedSeats([]);
    props.close();
  };

  const total = MaleCount + FemaleCount;

  console.log("Picked seats", PickedSeats);

  const SelectedSeats = (num) => {
    const isSelected = PickedSeats.includes(num);
    const isReserved = ReservedWomenSeats.includes(num);
    if (PickedSeats.length === total && !isSelected) {
      alert("You reached the max limit");
    } else if (isSelected) {
      const updatedList = PickedSeats.filter((item) => item !== num);
      setPickedSeats(updatedList);
      if (isReserved) {
        const update = fem.filter((item) => item !== num);
        SetFem(update);
      }
    } else if (!isSelected && !isReserved) {
      setPickedSeats([...PickedSeats, num]);
    } else if (!isSelected && isReserved && FemaleCount == 0 && MaleCount > 0) {
      alert(`You can't book a men seat near ladies seat`);
    } else if (!isSelected && isReserved && MaleCount == 0 && FemaleCount > 0) {
      SetFem([...fem, num]);
      setPickedSeats([...PickedSeats, num]);
    } else if (!isSelected && isReserved && MaleCount > 0 && FemaleCount > 0) {
      if (fem.length < FemaleCount || fem.length === undefined) {
        SetFem([...fem, num]);
        setPickedSeats([...PickedSeats, num]);
      } else if (fem.length == FemaleCount) {
        alert(`You can't book a men seat near to a ladies seat`);
      }
    }
  };

  const BookTickets = async (e) => {
    e.preventDefault();
    const newFormData = PickedSeats.map((seat, index) => ({
      seatNumber: seat,
      name: formData[index]?.name || "",
      age: formData[index]?.age || "",
      gender: formData[index]?.gender || "",
    }));
    const userSession = await getSession();
    if (userSession) {
      console.log("FormData:", { data: newFormData });
      const response = await fetch("api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Get: newFormData, id: props.Data._id }),
      });
      const jsonData = await response.json();
      alert(jsonData.msg);
      router.push("/");
    } else {
      alert("Login to continue booking");
      window.open("/login", "_blank");
    }
  };
  const styles = {
    "& .MuiInputLabel-root": {
      color: "blue",
    },
    "& .MuiInputBase-input": {
      color: "blue",
    },
    "& .MuiOutlinedInput-root": {
      borderColor: "blue",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "blue",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "blue",
    },
  };
  return (
    <div className={classes.div}>
      <div className={classes.div1}>
        <span>Chennai Express</span>
        <span>{props.Data.Bus_no}</span>
        <span onClick={closeWindow}>X</span>
      </div>
      <div className={classes.div2}>
        <div className={classes.left}>
          <GenderForm male={Male} female={Female} Show={GetShow} />
          <Legand />
          <center>Lower Deck</center>
          <div className={`${classes.UpperDeck} ${!Show ? classes.dis : " "}`}>
            <div>hello</div>
            <div className={classes.UpperSeats}>
              {data.Seats.Lower.Seater.map((seat) => (
                <div
                  key={seat.seat_num}
                  className={`${classes.seater} ${
                    seat.seatStatus !== "Available"
                      ? classes.Booked
                      : classes.available
                  } ${
                    PickedSeats.includes(seat.seat_num) ? classes.select : " "
                  }
                  ${
                    ReservedWomenSeats.includes(seat.seat_num) &&
                    seat.seatStatus === "Available"
                      ? classes.Reserved
                      : ""
                  }
                  ${
                    seat.seatStatus !== "Available" &&
                    seat.passengerDetails.gender == "Female"
                      ? classes.pink
                      : " "
                  }
                  `}
                  onClick={
                    seat.seatStatus == "Available"
                      ? () => SelectedSeats(seat.seat_num)
                      : () => {}
                  }
                >
                  {seat.seat_num}
                </div>
              ))}

              {data.Seats.Lower.sleeper.map((seat) => (
                <div
                  key={seat.seat_num}
                  onClick={
                    seat.seatStatus == "Available"
                      ? () => SelectedSeats(seat.seat_num)
                      : () => {}
                  }
                  className={`${classes.sleeper} ${
                    seat.seatStatus !== "Available"
                      ? classes.Booked
                      : classes.available
                  } ${
                    PickedSeats.indexOf(seat.seat_num) !== -1
                      ? classes.select
                      : " "
                  }`}
                >
                  {seat.seat_num}
                </div>
              ))}
            </div>
          </div>
          <center>Upper Deck</center>
          <div className={`${classes.LowerDeck} ${!Show ? classes.dis : " "}`}>
            {data.Seats.Upper.Right.map((seat) => (
              <div
                key={seat.seat_num}
                onClick={
                  seat.seatStatus == "Available"
                    ? () => SelectedSeats(seat.seat_num)
                    : () => {}
                }
                className={`${classes.UpperRight} ${
                  seat.seatStatus !== "Available"
                    ? classes.Booked
                    : classes.available
                } ${
                  PickedSeats.indexOf(seat.seat_num) !== -1
                    ? classes.select
                    : " "
                }
                ${
                  ReservedWomenSeats.includes(seat.seat_num) &&
                  seat.seatStatus === "Available"
                    ? classes.Reserved
                    : ""
                }
                ${
                  seat.seatStatus !== "Available" &&
                  seat.passengerDetails.gender == "Female"
                    ? classes.pink
                    : " "
                }`}
              >
                {seat.seat_num}
              </div>
            ))}
            {data.Seats.Upper.Left.map((seat) => (
              <div
                key={seat.seat_num}
                onClick={
                  seat.seatStatus == "Available"
                    ? () => SelectedSeats(seat.seat_num)
                    : () => {}
                }
                className={`${classes.sleeper} ${
                  seat.seatStatus !== "Available"
                    ? classes.Booked
                    : classes.available
                } ${
                  PickedSeats.indexOf(seat.seat_num) !== -1
                    ? classes.select
                    : " "
                }`}
              >
                {seat.seat_num}
              </div>
            ))}
          </div>
        </div>
        <div className={classes.right}>
          {!Show && (
            <div className={classes.helper}>
              Please select the total number of male and female seats to
              continue booking
            </div>
          )}
          {PickedSeats.length > 0 && (
            <form onSubmit={BookTickets} className={classes.form}>
              {PickedSeats.map((item, index) => (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <FormControl className={classes.field} sx={{ maxWidth: 100 }}>
                    <TextField
                      sx={styles}
                      label="Seat no"
                      size="small"
                      value={item}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                  <FormControl
                    sx={{ maxWidth: 150 }}
                    size="small"
                    className={classes.field}
                  >
                    <TextField
                      sx={styles}
                      label="Name"
                      variant="outlined"
                      size="small"
                      value={formData[index]?.name || ""}
                      required
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl
                    sx={{ maxWidth: 150 }}
                    size="small"
                    className={classes.field}
                  >
                    <TextField
                      sx={styles}
                      label="Age"
                      variant="outlined"
                      size="small"
                      value={formData[index]?.age || ""}
                      required
                      onChange={(e) =>
                        handleInputChange(index, "age", e.target.value)
                      }
                    />
                  </FormControl>

                  <FormControl
                    className={classes.field}
                    sx={{ minWidth: 150 }}
                    size="small"
                  >
                    <InputLabel>Gender</InputLabel>
                    <Select
                      sx={styles}
                      value={formData[index]?.gender || ""}
                      onChange={(e) =>
                        handleInputChange(index, "gender", e.target.value)
                      }
                      required
                    >
                      {fem.includes(item) ? (
                        <MenuItem value={"Female"}>Female</MenuItem>
                      ) : (
                        (FemaleCount == 0 && (
                          <MenuItem value={"Male"}>Male</MenuItem>
                        )) ||
                        (MaleCount == 0 && (
                          <MenuItem value={"Female"}>Female</MenuItem>
                        )) || [
                          <MenuItem value={"Male"}>Male</MenuItem>,
                          <MenuItem value={"Female"}>Female</MenuItem>,
                        ]
                      )}
                    </Select>
                  </FormControl>
                </div>
              ))}
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="medium"
              >
                Book
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
