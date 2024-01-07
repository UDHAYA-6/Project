import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import ButtonAppBar from "@/components/nav";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Button } from "@mui/material";
import classes from "../styles/Home.module.css";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
export default () => {
  const { width, height } = useWindowSize();
  const router = useRouter();
  const ButtonClick = () => {
    router.push("/");
  };
  return (
    <>
      <ButtonAppBar />
      <Confetti width={1500} height={500} style={{ overflow: "hidden" }} />
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
