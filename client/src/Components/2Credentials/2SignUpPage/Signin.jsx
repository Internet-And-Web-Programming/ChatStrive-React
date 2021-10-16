// This is for the signin page
import React, { useState } from "react";
import Nav from "../../0MainComponents/NavBar";
import "../CredentialDesign.css";
import components from "../components";
import { Link } from "react-router-dom";
import Validate from "../formValidation";

// import { vName, vUsername, vPassword, vCPassword, vEmail } from "../Validation";
class ElementList {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
}

// List of elements to be displayed in the nav bar
const navBarElements = [
  new ElementList("Home", "/"),
  new ElementList("Login", "/Login"),
  new ElementList("ContactUs", "/ContactUs"),
];

// Signin page
function Signin() {
  const [name, changeName] = useState("");
  function handleChange(e) {
    e.preventDefault();
    changeName(Validate(e.target));
    console.clear();
    console.log(e.target);
  }
  return (
    <div style={style}>
      <Nav navElements={navBarElements} />
      <div style={style2}>
        <div className="box">
          <h1>Sign In</h1>
          <form name="signup">
            {components.Signin.map((Signin) => (
              <div className="component">
                <label>{Signin.name}</label>
                <input
                  type={Signin.type}
                  name={Signin.name}
                  placeholder={Signin.placeholder}
                  id={Signin.id}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="bg">
              <button>
                <a href="/Login">Sign In</a>
              </button>
            </div>
            <p>
              {components.SigninDrama.content}
              <Link to={components.SigninDrama.a}>
                {components.SigninDrama.link}
              </Link>
            </p>
          </form>
          <p style={style3}>{name}</p>
        </div>
      </div>
    </div>
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

const style3 = {
  FontFace: "Arial",
  fontSize: "larger",
  padding: "10px",
};

export default Signin;
