import React from "react";

//Styling for the main component
const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "top",
  height: "100vh",
};

// chatWindow page

function chatWindow() {
  return (
    <div style={style}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>chatWindow Page</h1>
            <p>This is the chatWindow page.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default chatWindow;
