import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import CustomizedSnackbars from "@/components/Snackbar/Alert";
import styles from "../styles/login.module.css";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControl,
  IconButton,
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
  const [snackbarInfo, setSnackbarInfo] = useState(null);
  const [ConfValid, setConfValid] = useState(true);
  const [value, setvalue] = useState(false);

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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!passwordRegex.test(event.target.value) && event.target.value !== "") {
      setPassValid(false);
    } else {
      setPassValid(true);
    }
  };

  const ConfrimChange = (event) => {
    setConfrim(event.target.value);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
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
    setvalue(true);
    event.preventDefault();

    if (Login == "login") {
      if (!PassValid || !EmailValid) {
        alert("invalid inputs");
        return;
      }
      try {
        const response = await signIn("credentials", {
          Email,
          Pass,
          redirect: false,
        });

        if (!response.ok) {
          setSnackbarInfo({ type: "error", message: "Invalid credentials" });
          setvalue(false);
        } else {
          setSnackbarInfo({
            type: "success",
            message: "You are successfully logged in",
          });
          setvalue(false);
          router.push("/");
          window.close();
        }
      } catch (error) {
        setSnackbarInfo({ type: "error", message: error });
      }
    } else {
      if (!NameValid || !PassValid || !EmailValid || !ConfValid) {
        alert("Invalid inputs");
        return;
      }
      const response = await fetch("api/reg", {
        body: JSON.stringify({ Email, Pass, Name }),
        method: "POST",
        headers: { "content-Type": "application/json" },
      });
      const jsonData = await response.json();
      if (response.status === 200) {
        const response1 = await signIn("credentials", {
          Email,
          Pass,
          redirect: false,
        });

        if (response.ok) {
          setSnackbarInfo({
            type: "success",
            message: "Registered successfully",
          });
          setvalue(false);
          window.close();
          router.push("/");
        }
      } else {
        setSnackbarInfo({ type: "error", message: jsonData.msg });
        setvalue(false);
      }
    }
  };
  const ChangeVisiblity = () => {
    setPassEye(!PassEye);
  };
  const ChangeVisiblity2 = () => {
    setConfEye(!ConfEye);
  };
  const align = { marginBottom: "0.7rem" };
  return (
    <div className={styles.body}>
      <div className={styles.div1}>
        <form className={styles.form} onSubmit={formSubmit}>
          <Stack direction="row">
            <ToggleButtonGroup
              value={Login}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
              size="small"
            >
              <ToggleButton
                value="login"
                sx={{ minWidth: 150 }}
                color="success"
              >
                Login
              </ToggleButton>
              <ToggleButton
                value="signin"
                sx={{ minWidth: 150 }}
                color="secondary"
              >
                SignIn
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <div className={styles.inputFeilds}>
            {Login !== "login" && (
              <FormControl style={align}>
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
            <FormControl style={align}>
              <TextField
                variant="standard"
                label="Email"
                error={!EmailValid}
                required
                value={Email}
                onChange={EmailChange}
              />
            </FormControl>

            <FormControl style={align}>
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
                        {PassEye ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            {Login !== "login" && (
              <FormControl style={align}>
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
                          {ConfEye ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            )}

            <Button variant="contained" type="submit">
              {`${!value && Login == "login" ? "Log In" : " "}   ${
                value && Login == "login" ? "Logging.." : " "
              } ${!value && Login != "login" ? "Create account" : " "}   ${
                value && Login != "login" ? "Creating.." : " "
              }`}
            </Button>
          </div>
        </form>
      </div>
      <div className={styles.div2}></div>
      {snackbarInfo && (
        <CustomizedSnackbars
          type={snackbarInfo.type}
          message={snackbarInfo.message}
        />
      )}
    </div>
  );
};

export default Login;
