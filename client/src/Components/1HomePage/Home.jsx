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
  new ElementList("Login", "/Login"),
  new ElementList("Signin", "/Signin"),
  new ElementList("ContactUs", "/ContactUs"),
];

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "top",
  height: "100%",
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
// Home page

function Home() {
  return (
    <div style={style}>
      <Nav navElements={navBarElements} />
      <div style={style2}>
        {/* <Btn style={btnLocation} /> */}
        <h1>Home Page</h1>
        <p>This is the home page.</p>
      </div>
    </div>
  );
}

export default Home;
