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

import { useAuth } from "../hooks/useAuth";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

function ResetPassword() {
  const [values, setValues] = React.useState({
    email: ""
  });

  const { resetpassword } = useAuth();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://www.example.com/finishSignUp?cartId=1234',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };

  return (
    <>
      <h1>Reset Password</h1>
      <p>
        Enter the email address associated with your account
        and we'll send you a link to reset your password
      </p>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="email-input">
          Email Address
        </InputLabel>
        <BootstrapInput id="email-bootstrap" value={values.email} onChange={handleChange("email")}/>
      </FormControl>
      <p> </p>
      <Button
        style={{ maxWidth: "220px", fontSize: 14 }}
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => resetpassword(values.email)}
      >
        Continue
      </Button>
    </>
  );
}

export default ResetPassword;