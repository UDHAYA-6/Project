import React, { useState } from "react";
import classes from "../styles/login.module.css";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const router = useRouter();
  const [Login, setLogin] = useState(true);
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
  const EyeFunaction = (key) => {
    if (key === 0) {
      setPassEye(!PassEye);
    } else {
      setConfEye(!ConfEye);
    }
  };
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
  const SignIn = () => {
    setLogin(true);
    setConfValid(true);
    setPassValid(true);
    setNameValid(true);
    setEmailValid(true);
    setPassEye(false);
    setConfEye(false);
  };
  const SignUp = () => {
    setLogin(false);
    setConfValid(true);
    setPassValid(true);
    setNameValid(true);
    setEmailValid(true);
    setPassEye(false);
    setConfEye(false);
  };
  const formSubmit = async (event) => {
    event.preventDefault();
    if (Login) {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({ Email, Pass }),
          headers: { "Content-Type": "application/json" },
        });
        const jsonData = await response.json();
        if (response.status === 200) {
          router.push("/page");
        } else {
          alert(jsonData.msg);
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

  return (
    <div className={classes.body}>
      <div className={classes.div1}>
        <form className={classes.form} onSubmit={formSubmit}>
          <center>
            <div className={classes.formSwitch}>
              <div
                className={`${classes.left} ${Login ? classes.activate : " "}`}
                onClick={SignIn}
              >
                Sing In
              </div>
              <div
                className={`${classes.right} ${
                  !Login ? classes.activate : " "
                }`}
                onClick={SignUp}
              >
                Sign Up
              </div>
            </div>
          </center>
          <div className={classes.inputFeilds}>
            {!Login && (
              <div>
                <input
                  type="text"
                  required
                  placeholder="Enter Your Name"
                  onChange={NameChange}
                />
                {!NameValid && (
                  <p className={classes.error}>must be atleast 3 charcter</p>
                )}
              </div>
            )}
            <div>
              <input
                type="email"
                required
                placeholder="Enter Your Email"
                onChange={EmailChange}
              />
              {!EmailValid && <p className={classes.error}>Invlaid Email</p>}
            </div>

            <div className={classes.EyeDiv}>
              <input
                type={PassEye ? "text" : "password"}
                required
                placeholder="Password"
                onChange={PassChange}
              />
              <span className={classes.EyeSpan} onClick={() => EyeFunaction(0)}>
                {PassEye ? <FaEye /> : <FaEyeSlash />}
              </span>
              {!PassValid && (
                <p className={classes.error}>
                  min 8-char, atleast 1-upper, 1-lower case, 1-spl char, 1-num
                </p>
              )}
            </div>

            {!Login && (
              <div className={classes.EyeDiv}>
                <input
                  type={ConfEye ? "text" : "password"}
                  required
                  placeholder="Confrim Password"
                  onChange={ConfrimChange}
                />
                <span
                  className={classes.EyeSpan}
                  onClick={() => EyeFunaction(1)}
                >
                  {ConfEye ? <FaEye /> : <FaEyeSlash />}
                </span>
                {!ConfValid && (
                  <p className={classes.error}>password Mismatch or Invalid</p>
                )}
              </div>
            )}
            <center>
              <button>{Login ? "Login" : "Create account"}</button>
            </center>
          </div>
        </form>
      </div>
      <div className={classes.div2}></div>
    </div>
  );
};

export default Login;
