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

function Home() {
  return (
    <>
      <Nav navElements={navBarElements} />
      <div className="MainPageSection">
        {/* <Btn style={btnLocation} /> */}
        <h1>Home Page</h1>
        <p>This is the home page.</p>
      </div>
    </>
  );
}

export default Home;
