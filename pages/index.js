import React, { useState, useEffect } from "react";
import NavBar from "@/components/Genral NavBar/nav";
import Bus from "@/components/Bus and Bus Search/Bus";
import BusSearch from "@/components/Bus and Bus Search/BusSearch";
import { isMobile } from "react-device-detect";

const Page = () => {
  const [data, setData] = useState([]);
  const [Date, setDate] = useState("");
  const handleData = (value) => {
    setData(value);
  };
  const handleDate = (value) => {
    setDate(value);
  };
  useEffect(() => {
    if (data.length > 0) {
      window.scrollTo({ top: 700, behavior: "smooth" });
    }
  }, [data]);
  return (
    <>
      {!isMobile ? (
        <>
          <NavBar />
          <BusSearch getData={handleData} getDate={handleDate} />
          {data.length > 0 && <Bus values={data} date={Date} />}
        </>
      ) : (
        <center>
          <div
            style={{
              textAlign: "justify",
              width: "70%",
              padding: "10px",
              backgroundColor: "#FFEB3B",
              borderRadius: "10px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <p>
              This application is optimized for PC and desktop. Please use a
              computer for the best experience.
            </p>
          </div>
        </center>
      )}
    </>
  );
};

export default Page;
