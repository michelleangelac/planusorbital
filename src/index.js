import { StrictMode } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ProvideAuth } from "./hooks/useAuth";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
