import { Button } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
//import { useAuth } from "../hooks/useAuth";

function PageLogin() {
  //const { signInWithGoogle } = useAuth();

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3)
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "auto",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow"
      ]),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main
      }
    }
  }));

  return (
    <>
      <h1>Login to your account</h1>
      <Button variant="contained" color="primary">
        Continue with Google
      </Button>
      <p> or </p>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="bootstrap-input">
          Email
        </InputLabel>
        <BootstrapInput id="bootstrap-input" />
      </FormControl>
      <p> </p>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="bootstrap-input">
          Password
        </InputLabel>
        <BootstrapInput id="bootstrap-input" />
      </FormControl>
      <p> </p>
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
    </>
  );
}

export default PageLogin;
