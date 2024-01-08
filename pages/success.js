import React from "react";
import Confetti from "react-confetti";
import ButtonAppBar from "@/components/Genral NavBar/nav";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Button } from "@mui/material";
import classes from "../styles/Home.module.css";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
export default () => {
  const router = useRouter();
  const ButtonClick = () => {
    router.push("/");
  };
  return (
    <>
      <ButtonAppBar />
      <center>
        <Confetti
          width={1200}
          height={500}
          style={{
            overflow: "hidden",
          }}
        />
      </center>
      <div className={classes.div}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <h1 style={{ color: "green" }}>Seats Booked</h1>
          <DoneAllIcon fontSize="medium" color="success" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <Button size="medium" variant="contained" onClick={ButtonClick}>
            Home <HomeIcon fontSize="medium" />
          </Button>
        </div>
      </div>
    </>
  );
};
