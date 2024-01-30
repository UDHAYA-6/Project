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
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#FFEB3B",
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
