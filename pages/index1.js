import React from "react";
import classes from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { FaWalking } from "react-icons/fa";
import NavBar from "@/components/nav";
const VideoBackground = () => {
  const router = useRouter();
  const btnClick = () => {
    router.push("/login");
  };
  return (
    <div className={classes.body}>
      <NavBar />
      <img src="/bg.png" className={classes.img} />
      <div className={classes.div}>
        <div>
          <button className={classes.btn} onClick={btnClick}>
            Book now <FaWalking />
          </button>
        </div>
      </div>
    </div>
  );
};
export default VideoBackground;
