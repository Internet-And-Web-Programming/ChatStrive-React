import React, { useState } from "react";
import Nav from "../Navigation/NavBar";
import Validate from "./formValidation";
import components from "./components";
import "./reg.css";
import { Link } from "react-router-dom";
import { UserDetails } from "./NewRegister";
class ElementList {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
}

let User = [];
function setUserValues(Username) {
  User = [];
  User.push(Username);
  console.log("User is ", User);
}

// List of elements to be displayed in the nav bar
const navBarElements = [
  new ElementList("Home", "/"),
  new ElementList("Signin", "/NewRegister"),
  new ElementList("ContactUs", "/ContactUs"),
];

function Register() {
  // console.log("These are the user details", UserDetails);
  const [name, changeName] = useState("");
  function handleChange(e) {
    e.preventDefault();
    changeName(Validate(e.target));
  }

  const verify = (forms) => {
    setUserValues(forms);
  };
  const eve = (event) => {
    let forms = document.forms[0].elements;
    var check = true;
    for (let i = 0; i < forms.length - 1; i++) {
      if (forms[i].value === "") {
        check = false;
      }
    }
    if (name !== "") {
      check = false;
      alert("Please fill the details properly");
    }
    if (!check) {
      console.log("Please fill all the fields");
      event.preventDefault();
    } else {
      verify(forms[0].value);
    }
  };
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
              <Link to="/Chat" onClick={eve}>
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
