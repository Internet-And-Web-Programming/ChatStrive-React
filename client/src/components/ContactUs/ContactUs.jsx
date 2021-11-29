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
  new ElementList("Home", "/"),
  new ElementList("Login", "/Register"),
  new ElementList("Signin", "/NewRegister"),
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

function ContactUs() {
  console.clear();
  return (
    <div style={style}>
      <Nav navElements={navBarElements} />
      {/* <Btn style={btnLocation} /> */}
      <div style={style2}>
        <h1>Contact Us</h1>
        /*<p>Sorry But this service is currently unavailable</p>*/
        /*Added section*/
         <form id="contact-form" method="POST">
          <label htmlFor="name">Full Name</label>
          <input name="name" placeholder="Enter full name..." type="text" />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="email" />
          <label htmlFor="message">Message</label>
          <textarea rows="6" placeholder="Enter message..." name="message" required></textarea>
          <button type="submit"> Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
