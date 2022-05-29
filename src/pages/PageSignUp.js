import * as React from "react";
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

//Confirm password ikut keisi wkt input set pw
//* blm warna merah?

function PageSignUp() {
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

  //const { signInWithGoogle } = useAuth();

  return (
    <>
      <h1>Sign Up</h1>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="usn-input">
          Username*
        </InputLabel>
        <BootstrapInput id="usn-bootstrap" />
      </FormControl>
      <p> </p>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="fname-input">
          Full Name*
        </InputLabel>
        <BootstrapInput id="fname-bootstrap" />
      </FormControl>
      <p> </p>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="email-input">
          Email Address*
        </InputLabel>
        <BootstrapInput id="email-bootstrap" />
      </FormControl>
      <p> </p>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="faculty-input">
          Faculty
        </InputLabel>
        <BootstrapInput id="faculty-bootstrap" />
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
      <Button
        style={{ maxWidth: "220px", fontSize: 14 }}
        variant="contained"
        color="primary"
        fullWidth
      >
        Sign Up
      </Button>
    </>
  );
}

export default PageSignUp;
