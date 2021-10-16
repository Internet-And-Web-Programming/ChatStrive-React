import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  fontSize: "1.3vw",
  fontWeight: "bold",
};
const NavStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  width: "100%",
  height: "100px",

  // backgroundColor: `${Theme[0]}`,
};
const box = {
  height: "100%",
  padding: "0%",
  marginRight: "5%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Nav = (props) => {
  var elements = props.navElements;
  // console.log(`Getting Theme as  ${Theme[0]}`);
  return (
    <>
      <div className="colorTarget" style={NavStyle}>
        {elements.map((element) => (
          <div style={box} className="Box">
            <Link to={element.link} style={linkStyle}>
              <strong>{element.name}</strong>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
export default Nav;
