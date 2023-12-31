import React, { useEffect, useState } from "react";
import ButtonAppBar from "../Admin Navigations/nav2";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab1 from "./tab1";
import Tab2 from "./tab2";
import Tab3 from "./tab3";
import useSWR from "swr";
const AdminBoard = () => {
  const [value, setValue] = useState("1");
  const [Data, setData] = useState([]);
  const [Data2, setData2] = useState([]);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/bus", fetcher);
  const handleChange = (event, event2) => {
    setData2([]);
    setValue(event2);
  };
  useEffect(() => {
    if (data) {
      setData(data);
    } else {
      console.log(error);
    }
  }, [data]);

  const GetId = (id) => {
    setValue("2");
    const Filter = Data.filter((item) => item._id == id);
    setData2(Filter);
  };
  return (
    <>
      <ButtonAppBar />
      <Box sx={{ width: "60%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="ALL BUSES" value="1" />
              <Tab label="EDIT BUS" value="2" />
              <Tab label="ADD NEW BUS" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {Data.length > 0 && <Tab1 dt={Data} Id={GetId} />}
          </TabPanel>
          <TabPanel value="2">
            {Data2.length > 0 ? (
              <Tab2 dt={Data2[0]} />
            ) : (
              <h2>No bus is selected</h2>
            )}
          </TabPanel>
          <TabPanel value="3">
            <Tab3 />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default AdminBoard;
