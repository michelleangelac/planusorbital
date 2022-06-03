import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
//import TextField from "@mui/material/TextField";
//import { alpha, styled } from "@mui/material/styles";
//import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//import Link from "@material-ui/core/Link";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@mui/material/Checkbox";

import "./PageLogin.module.css";
import BootstrapInput from "../components/BootstrapInput";
import ControlledCheckbox from "../components/ControlledCheckbox";
//import PageSignUp from "./PageSignUp";

import { useAuth } from "../hooks/useAuth";

function PageLogin() {
  const [email, setEmail] = useState("");
  //Password visibility
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const { signInWithGoogle } = useAuth();
  const { signin } = useAuth();

  return (
    <>
      <h1>Login to Your Account</h1>
      <Button
        className='google-button'
        style={{ maxWidth: "250px", fontSize: "14px" }}
        variant="outlined"
        fullWidth
        startIcon={
          <Avatar
            sx={{ width: 20, height: 20 }}
            src={
              "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
            }
          />
        }
        onClick={signInWithGoogle}
      >
        Continue with Google
      </Button>
      <div className="line">
        <span className="text" style={{ fontSize: 10 }}>
          or
        </span>
        <script src="./src/index.js"></script>
      </div>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="bootstrap-input">
          Email
        </InputLabel>
        <BootstrapInput id="email-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </FormControl>
      <p> </p>
      <FormControl variant="standard" style={{ marginLeft: "33px" }}>
        <InputLabel shrink htmlFor="bootstrap-input">
          Password
        </InputLabel>
        <BootstrapInput
          id="password-input"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <p style={{ fontSize: 10 }}>
        {" "}
        <ControlledCheckbox label="Remember me?"></ControlledCheckbox>
        Remember me?{" "}
        <a href="/resetpassword" className="resetpw-label" style={{ marginLeft: 30 }}>
          Forget your password?
        </a>
      </p>
      <p> </p>
      <Button
        style={{ maxWidth: "250px", fontSize: "14px" }}
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => signin(email, values.password)}
      >
        Login
      </Button>
      <p className="signup-label" style={{ fontSize: 10 }}>
        Not registered yet?{" "}
        <a href="/signup" className="link">
          Create an account
        </a>
      </p>
    </>
  );
}

export default PageLogin;
