import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import styles from "../styles/login.module.css";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from "@mui/material";

const Login = () => {
  const router = useRouter();
  const [Login, setLogin] = useState("login");
  const [Name, setName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [Confrim, setConfrim] = useState("");
  const [PassEye, setPassEye] = useState(false);
  const [ConfEye, setConfEye] = useState(false);
  const [NameValid, setNameValid] = useState(true);
  const [EmailValid, setEmailValid] = useState(true);
  const [PassValid, setPassValid] = useState(true);
  const [ConfValid, setConfValid] = useState(true);

  const NameChange = (event) => {
    setName(event.target.value);
    if (event.target.value.length < 3 && event.target.value !== "") {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  const EmailChange = (event) => {
    SetEmail(event.target.value);
    const emailRegx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    if (!emailRegx.test(event.target.value) && event.target.value !== "") {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const PassChange = (event) => {
    setPass(event.target.value);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(event.target.value) && event.target.value !== "") {
      setPassValid(false);
    } else {
      setPassValid(true);
    }
  };

  const ConfrimChange = (event) => {
    setConfrim(event.target.value);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (
      !passwordRegex.test(event.target.value) &&
      event.target.value !== "" &&
      event.target.value !== Pass
    ) {
      setConfValid(false);
    } else {
      setConfValid(true);
    }
  };

  const handleAlignment = () => {
    if (Login === "login") {
      setLogin("signin");
    } else if (Login == "signin") {
      setLogin("login");
    }
    setConfValid(true);
    setPassValid(true);
    setNameValid(true);
    setEmailValid(true);
    setPassEye(false);
    setConfEye(false);
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    if (Login == "login") {
      try {
        const response = await signIn("credentials", {
          Email,
          Pass,
          redirect: false,
        });
        if (response.error) {
          console.log("error", response);
          alert("Invalid credentials");
        } else {
          console.log("correct");
          console.log(response);
          window.close();
        }
      } catch (error) {
        alert("Check your internet connection");
      }
    } else {
      const response = await fetch("api/reg", {
        method: "POST",
        body: JSON.stringify({ Name, Email, Pass }),
        headers: { "Content-Type": "application/json" },
      });
      const jsonData = await response.json();
      console.log(jsonData.msg);
      if (response.status === 200) {
        router.push("/page");
      } else {
        alert(jsonData.msg);
        console.log(jsonData.msg);
      }
    }
  };
  const ChangeVisiblity = () => {
    setPassEye(!PassEye);
  };
  const ChangeVisiblity2 = () => {
    setConfEye(!ConfEye);
  };
  return (
    <div className={styles.body}>
      <div className={styles.div1}>
        <form className={styles.form} onSubmit={formSubmit}>
          <Stack direction="row">
            <ToggleButtonGroup
              value={Login}
              color="success"
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
              size="large"
            >
              <ToggleButton value="login" color="primary">
                Login
              </ToggleButton>
              <ToggleButton value="signin">SignIn</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <div className={styles.inputFeilds}>
            {Login !== "login" && (
              <FormControl className={styles.Control}>
                <TextField
                  variant="standard"
                  label="Name"
                  required
                  error={!NameValid}
                  value={Name}
                  onChange={NameChange}
                />
              </FormControl>
            )}
            <FormControl className={styles.Control}>
              <TextField
                variant="standard"
                label="Email"
                error={!EmailValid}
                required
                value={Email}
                onChange={EmailChange}
              />
            </FormControl>

            <FormControl className={styles.Control}>
              <TextField
                label="Password"
                variant="standard"
                required
                error={!PassValid}
                type={PassEye ? "text" : "password"}
                onChange={PassChange}
                value={Pass}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={ChangeVisiblity}
                      >
                        {ConfEye ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            {Login !== "login" && (
              <FormControl className={styles.Control}>
                <TextField
                  label="Confrim password"
                  error={!ConfValid}
                  variant="standard"
                  required
                  type={ConfEye ? "text" : "password"}
                  onChange={ConfrimChange}
                  value={Confrim}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={ChangeVisiblity2}
                        >
                          {ConfEye ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            )}

            <Button variant="contained">
              {Login == "login" ? "Log In" : "Create account"}
            </Button>
          </div>
        </form>
      </div>
      <div className={styles.div2}></div>
    </div>
  );
};

export default Login;
