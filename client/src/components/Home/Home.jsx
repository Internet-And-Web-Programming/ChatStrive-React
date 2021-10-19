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
  new ElementList("Login", "/Register"),
  new ElementList("Signin", "/NewRegister"),
  new ElementList("ContactUs", "/ContactUs"),
];

function Home() {
  console.clear();
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
