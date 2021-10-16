import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Style from "./index.css";
import { BrowserRouter } from "react-router-dom";

//Configuring the SDK by wrapping application in Auth0Provider
// import { Auth0Provider } from "@auth0/auth0-react";
console.clear();

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

document.getElementById("root").style = Style;
ReactDOM.render(
  <BrowserRouter>
    {/* <Auth0Provider
      domain="dev-8xzjmkzb.us.auth0.com"
      clientId="Wqu5GU2ua2ffPI37AHzYpS2SXv37BDPu"
      redirectUri={window.location.origin}
      audience="https://dev-8xzjmkzb.us.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    > */}
    <App />
    {/* </Auth0Provider> */}
  </BrowserRouter>,
  document.getElementById("root")
);
