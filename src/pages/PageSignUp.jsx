import React, { useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import './PageLogin.css';
import "@fontsource/inter";
import BootstrapInput from "../components/BootstrapInput";

import { useAuth } from "../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, firebaseAuth } from "../hooks/useAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import passwordChangesInput from "../hooks/passwordChangesInput";

//add scroll bar

function PageSignUp() {
  const navigate = useNavigate();

  const { handleSubmit } = passwordChangesInput();

  //Password visibility
  const [values, setValues] = React.useState({
    username: "",
    name: "",
    email: "",
    faculty: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false
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

  const handleClickShowConfirmPassword = (x) => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { signup } = useAuth() || {};

  return (
    <div className="container-log">
      <div className="blue-bg"></div>
      <div className="content-log">
        <div className="title-su">Sign Up</div>
        <FormControl variant="standard" style={{ marginBottom: '3%' }}>
          <InputLabel shrink htmlFor="usn-input">
            Username*
          </InputLabel>
          <BootstrapInput 
            id="usn-bootstrap"
            style={{ width: '45vh' }} 
            value={values.username} 
            onChange={handleChange("username")} />
        </FormControl>
        <FormControl variant="standard" style={{ marginBottom: '3%' }}>
          <InputLabel shrink htmlFor="fname-input">
            Full Name*
          </InputLabel>
          <BootstrapInput 
            id="fname-bootstrap"
            style={{ width: '45vh' }} 
            value={values.name} 
            onChange={handleChange("name")}/>
        </FormControl>
        <FormControl variant="standard" style={{ marginBottom: '3%' }}>
          <InputLabel shrink htmlFor="email-input">
            Email Address*
          </InputLabel>
          <BootstrapInput 
            id="email-bootstrap"
            style={{ width: '45vh' }} 
            value={values.email} 
            onChange={handleChange("email")}/>
        </FormControl>
        <FormControl variant="standard" style={{ marginBottom: '3%' }}>
          <InputLabel shrink htmlFor="faculty-input">
            Faculty
          </InputLabel>
          <BootstrapInput 
            id="faculty-bootstrap" 
            style={{ width: '45vh' }}
            value={values.faculty} 
            onChange={handleChange("faculty")}/>
        </FormControl>
        <FormControl variant="standard" style={{ margin: '0 0 3% 7.5%' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Set Password*
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
        <FormControl variant="standard" style={{ margin: '0 0 6% 7.5%' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Confirm Password*
          </InputLabel>
          <BootstrapInput
            id="confirm-password-input"
            style={{ width: '51.25vh' }}
            type={values.showConfirmPassword ? "text" : "password"}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          style={{ 
            width: '50vh', 
            lineHeight: 2, 
            fontSize: '1em',
            marginBottom: '5%',  
            backgroundColor: "#5062AD",
            color: '#FFFFFF' 
          }}
          variant="contained"
          onClick={() => handleSubmit(values.password, values.confirmPassword, values.username, values.name, values.email, values.faculty)}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default PageSignUp;