import React, { useState } from "react";
import Nav from "../../0MainComponents/NavBar";
import components from "../components";
import "../CredentialDesign.css";
import Validate from "../formValidation";
import { useAuth0 } from "@auth0/auth0-react";

class ElementList {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
}
// List of elements to be displayed in the nav bar
const navBarElements = [
  new ElementList("Home", "/"),
  new ElementList("Signin", "/Signin"),
  new ElementList("ContactUs", "/ContactUs"),
];
// Login page

function Login() {
  const [name, changeName] = useState("");
  function handleChange(e) {
    e.preventDefault();
    changeName(Validate(e.target));
    console.clear();
    console.log(e.target);
  }
  const {
    isLoading,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    error,
    loginWithRedirect,
  } = useAuth0();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Sorry bro... {error.message}</div>;
  if (isAuthenticated) return console.log("Lol!!");

  return (
    !isAuthenticated && (
      <div style={style}>
        <Nav navElements={navBarElements} />
        <div style={style2}>
          <div className="box">
            <h1>Login</h1>
            <form name="login">
              {components.Login.map((Login) => (
                <div className="component">
                  <label>{Login.name}</label>
                  <input
                    type={Login.type}
                    name={Login.name}
                    placeholder={Login.placeholder}
                    id={Login.id}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="bg">
                <button>Login with JWT</button>
                <button onClick={loginWithRedirect}>Login with Auth0?</button>
              </div>
            </form>
            <p>{name}</p>
          </div>
        </div>
      </div>
    )
  );
}

//Styling for the main component
const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "top",
  height: "100vh",
};

const btnLocation = {
  padding: "7px",
  borderRadius: "10px",
  width: "auto",
  alignSelf: "flex-end",
  marginTop: "10px",
  marginRight: "10px",
};

const style2 = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  width: "100%",
};

export default Login;
