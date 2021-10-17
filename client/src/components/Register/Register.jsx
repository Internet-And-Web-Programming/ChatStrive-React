import React from "react";
import Nav from "../Navigation/NavBar";

class ElementList {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
}
// List of elements to be displayed in the nav bar
const navBarElements = [
  new ElementList("Login", "/Login"),
  new ElementList("Signin", "/Signin"),
  new ElementList("ContactUs", "/ContactUs"),
];

function Register() {
  return <div></div>;
}

export default Register;
