import React, { useState, useEffect } from "react";
import Nav from "../Navigation/NavBar";
import Validate from "./formValidation";
import components from "./components";
import "./reg.css";
import { Link } from "react-router-dom";
import { UserDetails } from "./NewRegister";
import { Connection } from "../SocketConnection/Connection";
import SHA1 from "crypto-js/sha1";

let conn = new Connection();

class ElementList {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
}
let User = {};
// List of elements to be displayed in the nav bar
const navBarElements = [
  new ElementList("Home", "/"),
  new ElementList("Signin", "/NewRegister"),
  new ElementList("ContactUs", "/ContactUs"),
];

// Main function of this file
function Register() {
  // console.log("These are the user details", UserDetails);
  const [name, changeName] = useState("");
  function handleChange(e) {
    e.preventDefault();
    changeName(Validate(e.target));
  }

  const Login = (event) => {
    let forms = document.forms[0].elements;
    if (name !== "") {
      let check = true;
      for (let i = 0; i < forms.length; i++) {
        if (forms[i].value === "") {
          check = false;
        }
      }
      if (check) {
        for (let i = 0; i < forms.length; i++) {
          User[forms[i].name] = forms[i].value;
          if (forms[i].name === "Password") {
            User[forms[i].name] = SHA1(forms[i].value).toString();
          }
        }
      } else {
        event.preventDefault();
        alert("Please fill in all the fields");
      }
    }
  };
  // Sending the data to the server using socket

  useEffect(() => {
    conn.on();
  }, [conn.self]);

  return (
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
              <Link to="/Chat" onClick={Login}>
                <button>Login</button>
              </Link>
            </div>
          </form>
          <p>{name}</p>
        </div>
      </div>
    </div>
    // )
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

export default Register;
export { User };
