import React, { useEffect, useState } from "react";
import ButtonAppBar from "@/components/nav";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import EmailIcon from "@mui/icons-material/Email";
import classes from "../styles/history.module.css";
import { getSession, useSession } from "next-auth/react";
const history = () => {
  const { data: session } = useSession();
  const [CurrentSession, setCurrentSession] = useState();
  const [Data, setData] = useState([]);

  useEffect(() => {
    const funct = async () => {
      const userSession = await getSession();
      setCurrentSession(userSession);
      if (userSession) {
        const response = await fetch("api/history", {
          method: "POST",
          body: JSON.stringify({ Email: userSession.session.user.email }),
          headers: { "Content-Type": "application/json" },
        });
        const jsonData = await response.json();

        if (response.status === 200) {
          setData(jsonData);
        } else {
          alert("Error in retriving user booking history");
        }
      } else {
        setData("no booking histroy available");
      }
    };
    funct();
  }, [session]);

  console.log(CurrentSession);

  return (
    <>
      <ButtonAppBar />
      <div className={classes.div}>
        <center>
          <Avatar
            className={classes.avatar}
            sx={{ bgcolor: "#141528", width: 75, height: 75, fontSize: "30px" }}
          >
            NA
          </Avatar>
          <p className={classes.name}>Udhaya Kumar</p>
        </center>
        <div>
          <div>
            <span>
              <EmailIcon />
            </span>
            <span>udhaya642003@gmail.com</span>
          </div>
          <div>
            <span>
              <ConfirmationNumberIcon />
            </span>
            <span>Total booking 11</span>
          </div>
          <div>
            <span>
              <SettingsIcon />
            </span>
            <span>Settings</span>
          </div>
          <div>
            <span>
              <LogoutIcon />
            </span>
            <span>Log out</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default history;
