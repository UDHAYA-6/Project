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
import SearchAppBar from "@/components/Admin Navigations/nav";
import CustomizedSnackbars from "../components/Snackbar/Alert";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../components/store/reducer";

const admin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn]);

  const FormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("api/fetch", {
        method: "POST",
        body: JSON.stringify({ Email, Password }),
        headers: { "Content-Type": "application/json" },
      });

      const jsonData = await response.json();

      if (response.status === 200) {
        setSnackbarInfo({ type: "success", message: jsonData.msg });
        dispatch(login());
        router.push("/dashboard");
      } else {
        setSnackbarInfo({ type: "error", message: jsonData.msg });
      }
    } catch (error) {
      setSnackbarInfo({ type: "error", message: error });
    }
  };
  // useEffect(() => {
  //   if (snackbarInfo) {
  //     const timer = setTimeout(() => {
  //       setSnackbarInfo(null);
  //     }, 4000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [snackbarInfo]);
  const syl = { marginBottom: "1.5rem" };
  return (
    <>
      <SearchAppBar />
      <form onSubmit={FormSubmit} className={classes.From}>
        <h1>Admin Login</h1>
        <FormControl sx={{ minWidth: 290 }} style={syl}>
          <TextField
            label="Email"
            variant="filled"
            type="email"
            required
            value={Email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>
        <FormControl variant="filled" sx={{ minWidth: 290 }} style={syl}>
          <InputLabel htmlFor="filled-adornment-password" required>
            Password
          </InputLabel>
          <FilledInput
            type={showPassword ? "text" : "password"}
            required
            value={Password}
            onChange={(event) => setPassword(event.target.value)}
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
