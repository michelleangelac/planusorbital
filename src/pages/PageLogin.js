import React from "react";
import { useState, useEffect } from "react";
import { Button, styled } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import './PageLogin.css';
import "@fontsource/inter";
import BootstrapInput from "../components/BootstrapInput";

import { firebaseAuth, useAuth, isNewUser, db } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, getAdditionalUserInfo } from "firebase/auth";
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

  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '1em',
    lineHeight: 2,
    width: '50vh',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    color: '#736E6E',
    fontWeight: '600',
    fontFamily: [
      'Inter',
    ].join(','),
    '&:hover': {
      backgroundColor: '#EEEBEB',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#FFFFFF'
    }
  });  

  return (
    <div className="container-log">
      <div className="blue-bg"></div>
      <div className="content-log">
        <div className="title-log">Login to Your Account</div>
        <div>
          <BootstrapButton
            className='google-button'
            variant="outlined"
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
          </BootstrapButton>
        </div>
        <div className="hl">
          <span className="hl span">
            or
          </span>
        </div>
        <FormControl variant="standard" style={{ margin: '3% 0 3% 0' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Email
          </InputLabel>
          <BootstrapInput 
            id="email-input" 
            style={{ width: '45vh' }}
            value={values.email} 
            onChange= { handleChange("email") }/>
        </FormControl>
        <FormControl variant="standard" style={{ margin: '3% 0 0.5% 7.5%' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Password
          </InputLabel>
          <BootstrapInput
            id="password-input"
            style={{ width: '51.25vh' }}
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
        <p style={{ fontSize: '0.75em', paddingLeft: '30%', fontWeight: '600', fontFamily: "Inter" }}>
          <a href="/resetpassword" className="resetpw-link">
            Forget your password?
          </a>
        </p>
        <Button
          style={{ 
            width: '50vh', 
            lineHeight: 2, 
            fontSize: '1em', 
            margin: '4% 0 0.5% 0', 
            backgroundColor: "#5062AD",
            color: '#FFFFFF' 
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Login
        </Button>
        <p style={{ fontSize: '0.75em', fontFamily: "Inter" }}>
          Not registered yet?{" "}
          <a href="/signup" className="signup-link">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}

export default PageLogin;