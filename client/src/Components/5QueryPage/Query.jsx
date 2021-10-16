import React from "react";
import Nav from "../0MainComponents/NavBar";

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
  new ElementList("Signin", "/Signin"),
];
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

// Query page

function Query() {
  return (
    <div style={style}>
      <Nav navElements={navBarElements} />
      {/* <Btn style={btnLocation} /> */}
      <div style={style2}>
        <h1>Query Page</h1>
        <p>This is the Query page.</p>
      </div>
    </div>
  );
}

export default Query;
