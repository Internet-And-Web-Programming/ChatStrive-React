import React from "react";
import { Redirect } from "react-router";
import { useState } from "react";
import "./chatApp.css";
import Connection from "../SocketConnection/Connection";
import UserPanel from "./UserPanel";
import msgHandler from "./msgWindow";
import { Socket } from "socket.io-client";
import { useLocation } from "react-router-dom";
const usrPanel = new UserPanel();
const conn = new Connection();
const msg = new msgHandler();

function askNewUser() {
  document.querySelector(".getContacts").style.display = "flex";
  document.querySelector(".getContacts input").focus();
}

const connection = new Socket("http://localhost:4500");
connection.on("UserLoading", (socket) => {
  console.log("connected to :-", socket);
});

function Chat() {
  const location = useLocation();
  let [user, setUser] = useState([]);
  console.log(location.state.info[0]);
  if (location.state.info === undefined) {
    return <Redirect to="/Register" />;
  }
  const User = location.state.info[0];
  document.addEventListener("keydown", (event) => {
    if (event.altKey && event.keyCode === 78) {
      askNewUser();
    }
    if (event.altKey && event.keyCode === 84) {
      document.querySelector(".textingInput textarea").focus();
    }
    if (event.keyCode === 27) {
      document.querySelector(".textingInput textarea").value = "";
      document.querySelector(".textingInput textarea").blur();
    }
  });

  let addUser = () => {
    document.querySelector(".userList").innerHTML = "";
    let id = User.UserID;
    let username = document.querySelector(".getContacts input").value.trim();
    if (username !== "") {
      let data = [];
      data.push(id);
      data.push(username);
      usrPanel.addUser(data);
    }
    document.querySelector(".getContacts input").value = "";
    document.querySelector(".getContacts").style.display = "none";
  };

  conn.recieve("UserLoading", (data) => {
    console.log("Here in chatapp.jsx\t\t", data);
    setUser(data);
  });

  function attempt(event) {
    if (event.keyCode === 13) {
      addUser();
    }
  }

  // Manages the dynamic height of the textarea
  const manage = (e) => {
    if (e.keyCode === 13) {
      e.target.style.height = "inherit";
      // e.target.style.height = `${e.target.scrollHeight}px`;
      let limit = 200;
      e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
      if (e.target.scrollHeight > limit) {
        e.target.style.overflow = "auto";
      }
    }
  };
  const trigger = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.target.style.height = `${e.target.scrollHeight}px`;
    } else if (e.keyCode === 13 && e.shiftKey) {
      e.target.style.height = "50px";
      msg.send();
    }
    e.value = "";
  };

  return (
    <>
      <div className="ChattingPage">
        <div className="getContacts">
          <label>
            <b>Username of the User</b>
          </label>
          <input type="text" placeholder="Enter Username" onKeyDown={attempt} />
          <div className="bg">
            <button onClick={addUser}>Add</button>
            <button
              onClick={() => {
                document.querySelector(".getContacts").style.display = "none";
              }}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="userPanel">
          <div className="Header">
            <div className="userlogo">
              <img src="https://img.icons8.com/color/48/000000/user" />
            </div>
            {User["Name"]}
            <button type="button" onClick={askNewUser}>
              new
            </button>
          </div>
          <div className="userList"></div>
        </div>
        <div className="initialWindow">
          <div className="initialText">Select a user to start chatting</div>
        </div>
        <div className="messageWindow" style={{ display: "none" }}>
          <div className="Header">{user}</div>
          <div className="mainWindow" id="mainWindow"></div>
          <div className="textingInput">
            <textarea
              name="inputArea"
              id="inpArea"
              style={{ height: "35px" }}
              onKeyPress={manage}
              onKeyDown={trigger}
            ></textarea>
            <button onClick={msg.send}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
