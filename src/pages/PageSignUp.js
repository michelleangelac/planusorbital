import React, { useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
//import TextField from "@mui/material/TextField";
//import { alpha, styled } from "@mui/material/styles";
//import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import BootstrapInput from "../components/BootstrapInput";

import { useAuth } from "../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, firebaseAuth } from "../hooks/useAuth";
//import { firebase } from "firebase";

//* blm warna merah?

function PageSignUp() {
  const navigate = useNavigate(); 
  var user = firebaseAuth.currentUser;

  useEffect(() => {
    if(user) {
      navigate("/dashboard");
    } else {
    }
  })

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

  const handleSubmit = () => {
    if (values.password !== values.confirmPassword) {
        alert("Passwords don't match");
        navigate("/signup");
    } else if (values.username == "" || values.name == "" || values.email == "" || values.password == "") {
        alert("Please fill in the required fields.");
        navigate("/signup");
    } else {
        signup(values.email, values.confirmPassword);
        var user = firebaseAuth.currentUser;
        if (user) {
          setDoc(doc(db, "profile", user?.uid), { username: values.username, name: values.name, email: values.email, password: values.password, faculty: values.faculty });
          navigate("/dashboard"); 
        }
        else {
          navigate("/signup");
        }
    }
}

  const { signup } = useAuth();

  return (
    <>
      <h1>Sign Up</h1>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="usn-input">
          Username*
        </InputLabel>
        <BootstrapInput id="usn-bootstrap" value={values.username} onChange={handleChange("username")} />
      </FormControl>
      <p> </p>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="fname-input">
          Full Name*
        </InputLabel>
        <BootstrapInput id="fname-bootstrap" value={values.name} onChange={handleChange("name")}/>
      </FormControl>
      <p> </p>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="email-input">
          Email Address*
        </InputLabel>
        <BootstrapInput id="email-bootstrap" value={values.email} onChange={handleChange("email")}/>
      </FormControl>
      <p> </p>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="faculty-input">
          Faculty
        </InputLabel>
        <BootstrapInput id="faculty-bootstrap" value={values.faculty} onChange={handleChange("faculty")}/>
      </FormControl>
      <p> </p>
      <FormControl variant="standard" style={{ marginLeft: "33px" }}>
        <InputLabel shrink htmlFor="bootstrap-input">
          Set Password*
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
      <p> </p>
      <FormControl variant="standard" style={{ marginLeft: "33px" }}>
        <InputLabel shrink htmlFor="bootstrap-input">
          Confirm Password*
        </InputLabel>
        <BootstrapInput
          id="confirm-password-input"
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
      <p> </p>
      <Button
        style={{ maxWidth: "220px", fontSize: 14 }}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </>
  );
}

export default PageSignUp;