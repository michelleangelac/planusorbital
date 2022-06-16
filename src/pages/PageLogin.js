import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
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
//import ControlledCheckbox from "../components/ControlledCheckbox";
import PageSignUp from "./PageSignUp";

import { firebaseAuth, useAuth, isNewUser, db } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD
import { getAuth, onAuthStateChanged, getAdditionalUserInfo } from "firebase/auth";
=======
import { getAuth,   onAuthStateChanged, getAdditionalUserInfo } from "firebase/auth";
>>>>>>> 6f27fbeb0f7b5092ea29e3d915651e37894f3505
=======
import { getAuth,   onAuthStateChanged, getAdditionalUserInfo } from "firebase/auth";
>>>>>>> 6f27fbeb0f7b5092ea29e3d915651e37894f3505
import { doc, setDoc } from "firebase/firestore";

function PageLogin() {
  const navigate = useNavigate();
  //Password visibility
  const [values, setValues] = React.useState({
    username: "",
    name: "",
    email: "",
    password: "",
    faculty: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();
    signin(values.email, values.password);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("#");
      }
    })
  }

  const generateUsername = require('generate-username-from-email');

  const handleSubmitGoogle = async(event) => {
    event.preventDefault();
    const result = await signInWithGoogle();
    const { isNewUser } = getAdditionalUserInfo(result);
    var profilePic = getAdditionalUserInfo(result).profile.picture;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (isNewUser) {
          setDoc(doc(db, "profile", user.email), { username: generateUsername(user.email), name: user.displayName, email: user.email, password: values.password, faculty: values.faculty , profile: profilePic });
        }
        navigate("/dashboard");
      } else {
        navigate("#");
      }
    })
  }
  
  const { signInWithGoogle } = useAuth();
  const { signin } = useAuth();

  return (
    <>
      <h1>Login to Your Account</h1>
      <Button
        className='google-button'
        style={{ maxWidth: "235px", fontSize: "12px", justifyContent: 'start' }}
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
        onClick={handleSubmitGoogle}
      >
        Continue with Google
      </Button>
      <div className="line">
        <span className="line span" style={{ fontSize: 10 }}>
          or
        </span>
      </div>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="bootstrap-input">
          Email
        </InputLabel>
        <BootstrapInput id="email-input" value={values.email} onChange= { handleChange("email") } />
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
        <a href="/resetpassword" className="resetpw-label" style={{ marginLeft: 100 }}>
          Forget your password?
        </a>
      </p>
      <p> </p>
      <Button
        style={{ maxWidth: "235px", fontSize: "14px" }}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
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