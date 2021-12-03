import React, { useState } from "react";
import Nav from "../Navigation/NavBar";
import Validate from "./formValidation";
import components from "./components";
import "./reg.css";
import { Connection } from "../SocketConnection/Connection";
import { useHistory } from "react-router-dom";
import SHA1 from "crypto-js/sha1";
const conn = new Connection();
class ElementList {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
}
var UserDetails = [];
// List of elements to be displayed in the nav bar
const navBarElements = [
  new ElementList("Home", "/"),
  new ElementList("Signin", "/NewRegister"),
  new ElementList("ContactUs", "/ContactUs"),
];

// Main function of this file
function Register() {
  let history = useHistory();
  const login = () => {
    let state = [];
    let User = {};
    var forms = document.forms[0].elements;
    for (var i = 0; i < forms.length; i++) {
      User[forms[i].name] = forms[i].value;
      if (forms[i].name === "Password") {
        User[forms[i].name] = SHA1(forms[i].value).toString();
      }
    }
    console.log("User is :- ", User);
    conn.emit("login", User);
    conn.recieve("UsersLoading", (data) => {
      console.log(data);
      if (data[0].status === "NotFound") {
        alert("User not found");
        console.log("User not found");
      } else {
        state.push(data[1]);
        console.log("UserDetails are :- ", state);
        history.push("/Chat", { info: state });
      }
    });
  };
  const [name, changeName] = useState("");
  function handleChange(e) {
    e.preventDefault();
    changeName(Validate(e.target));
  }
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
          </form>
          <div className="bg">
            <button onClick={login}>Login</button>
          </div>

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
export { UserDetails };
