import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "../styles/admin.module.css";
import {
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FilledInput,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SearchAppBar from "@/components/Admin from/nav";
import CustomizedSnackbars from "../components/Snackbar/Alert";

const admin = () => {
  const router = useRouter();
  const [showPassword, setshowPassword] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState(null);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const EmailChange = (event) => {
    setEmail(event.target.value);
  };
  const PasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const FormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("api/admin", {
        method: "POST",
        body: JSON.stringify({ Email, Password }),
        headers: { "Content-Type": "application/json" },
      });

      const jsonData = await response.json();

      if (response.status === 200) {
        setSnackbarInfo({ type: "success", message: jsonData.msg });
        router.push("/dashboard");
      } else {
        setSnackbarInfo({ type: "error", message: jsonData.msg });
      }
    } catch (error) {
      setSnackbarInfo({ type: "error", message: error });
    }
  };
  useEffect(() => {
    if (snackbarInfo) {
      const timer = setTimeout(() => {
        setSnackbarInfo(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [snackbarInfo]);
  return (
    <>
      <SearchAppBar />
      <form onSubmit={FormSubmit} className={classes.From}>
        <h1>Admin Login</h1>
        <FormControl sx={{ minWidth: 290 }} className={classes.Control}>
          <TextField
            label="Email"
            variant="filled"
            type="email"
            required
            value={Email}
            onChange={EmailChange}
          />
        </FormControl>
        <FormControl
          variant="filled"
          sx={{ minWidth: 290 }}
          className={classes.Control}
        >
          <InputLabel htmlFor="filled-adornment-password" required>
            Password
          </InputLabel>
          <FilledInput
            type={showPassword ? "text" : "password"}
            required
            value={Password}
            onChange={PasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          sx={{ minWidth: 290 }}
          className={classes.Control}
          type="submit"
          size="large"
          variant="contained"
          color="info"
        >
          Log in
        </Button>
      </form>
      {snackbarInfo && (
        <CustomizedSnackbars
          type={snackbarInfo.type}
          message={snackbarInfo.message}
        />
      )}
    </>
  );
};

export default admin;
