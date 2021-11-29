import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Images/logo.png";
import "./navBar.css";
const linkStyle = {
  textDecoration: "none",
  fontSize: "1.3vw",
  fontWeight: "bold",
};
const navS = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  width: "100%",
  height: "100px",

  // backgroundColor: `${Theme[0]}`,
};
const NavStyle1 = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
};

const box = {
  height: "100%",
  padding: "0%",
  marginRight: "5%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const logoN = {
  height: "100%",
  padding: "0%",
  marginLeft: "5%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Nav = (props) => {
  var elements = props.navElements;
  // console.log(`Getting Theme as  ${Theme[0]}`);
  return (
    <div style={NavStyle1}>
      <div className="chatStriveLogo" style={logoN}>
        <img src={logo} alt="logo" />
      </div>
      <div className="colorTarget" style={navS}>
        {elements.map((element) => (
          <div style={box} className="Box">
            <Link to={element.link} style={linkStyle}>
              <strong>{element.name}</strong>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Nav;
