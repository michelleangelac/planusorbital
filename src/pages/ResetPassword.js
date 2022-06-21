import * as React from "react";
import { Button, Typography } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import './PageLogin.css';
import "@fontsource/inter";
import BootstrapInput from "../components/BootstrapInput";

import { useAuth } from "../hooks/useAuth";
//import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

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
    <div className="container-log">
      <div className="blue-bg"></div>
      <div className="content-log">
        <div className="title-rp">Reset Password</div>
        <div style={{ fontSize: '0.9em', fontFamily: "Inter" }}>
          Enter the email address associated with your account
        </div>
        <div style={{ fontSize: '0.9em', fontFamily: "Inter", margin: '1% 0 6% 0' }}>
          and we'll send you a link to reset your password
        </div>
        <FormControl variant="standard" style={{ marginBottom: '7%' }}>
          <InputLabel shrink htmlFor="email-input">
            Email Address
          </InputLabel>
          <BootstrapInput 
            id="email-bootstrap" 
            style={{ width: '45vh' }}
            value={values.email} 
            onChange={handleChange("email")}/>
        </FormControl>
        <Button
          style={{ 
            width: '50vh', 
            lineHeight: 2, 
            fontSize: '1em', 
            backgroundColor: "#5062AD",
            color: '#FFFFFF' 
          }}
          variant="contained"
          onClick={() => resetpassword(values.email)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default ResetPassword;