import React, { useState, useEffect } from "react";
import NavBar from "@/components/nav";
import Bus from "@/components/Bus";
import BusSearch from "@/components/BusSearch";

const Page = () => {
  const [data, setData] = useState([]);

  const handleData = (value) => {
    setData(value);
  };

  useEffect(() => {
    if (data.length > 0) {
      window.scrollTo({ top: 700, behavior: "smooth" });
    }
  }, [data]);

  return (
    <>
      <NavBar />
      <BusSearch getData={handleData} />
      {data.length > 0 && <Bus values={data} />}
    </>
  );
};

export default Page;
