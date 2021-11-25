import React, { useState } from "react";
import Nav from "../Navigation/NavBar";
import { Link } from "react-router-dom";
import Validate from "./formValidation";
import components from "./components";
import "./reg.css";
import { Connection } from "../SocketConnection/Connection";

const conn = new Connection();
class ElementList {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
}

// List of elements to be displayed in the nav bar
const navBarElements = [
  new ElementList("Home", "/"),
  new ElementList("Login", "/Register"),
  new ElementList("ContactUs", "/ContactUs"),
];
let UserDetails = [];
function NewRegister() {
  console.clear();
  let user = {};

  const sendUserDetails = () => {
    var form = document.forms[0].elements;
    console.clear();
    console.log(form);
    for (var i = 0; i < form.length - 1; i++) {
      user.key = form[i].name;
      user.value = form[i].value;
      UserDetails.push(user);
      user = {};
    }
    conn.emit("NewRegister", UserDetails);
    console.log(UserDetails);
  };

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
              <button onClick={sendUserDetails}>
                <Link to="/Register">Sign In</Link>
              </button>
            </div>
            <p>
              {components.SigningIn.content}
              <Link to={components.SigningIn.a}>
                {components.SigningIn.link}
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

export default NewRegister;
export { UserDetails };
