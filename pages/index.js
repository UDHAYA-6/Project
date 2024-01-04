import React, { useState } from "react";
import NavBar from "@/components/nav";
import Bus from "@/components/Bus";
import BusSearch from "@/components/BusSearch";
import classes from "../styles/Home.module.css";
const page = () => {
  const [data, setdata] = useState([]);
  const Data = (value) => {
    setdata(value);
  };
  return (
    <>
      <NavBar />
      <BusSearch getData={Data} />
      {data.length > 0 && <Bus values={data} />}
    </>
  );
};

export default page;
