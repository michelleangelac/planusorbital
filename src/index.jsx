import { StrictMode } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ProvideAuth } from "./hooks/useAuth";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
