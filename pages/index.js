import React from "react";
import classes from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { FaWalking } from "react-icons/fa";
const VideoBackground = () => {
  const router = useRouter();
  const btnClick = () => {
    router.push("/login");
  };
  return (
    <div className={classes.body}>
      <img src="/bg.png" className={classes.img} />
      <div className={classes.div}>
        <div className={classes.waviy}>
          <span style={{ "--i": 1 }}>N</span>
          <span style={{ "--i": 2 }}>e</span>
          <span style={{ "--i": 3 }}>w</span>
          <span style={{ "--i": 4 }}>t</span>
          <span style={{ "--i": 5 }}>o</span>
          <span style={{ "--i": 6 }}>n</span>
          <br></br>
          <span style={{ "--i": 8 }}>T</span>
          <span style={{ "--i": 9 }}>r</span>
          <span style={{ "--i": 10 }}>a</span>
          <span style={{ "--i": 11 }}>v</span>
          <span style={{ "--i": 12 }}>e</span>
          <span style={{ "--i": 13 }}>l</span>
          <span style={{ "--i": 14 }}>s</span>
        </div>
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
