import React from "react";
import socketIO from "socket.io-client";
import { useEffect } from "react";
import { User } from "../Register/Register";
import "./chatApp.css";
const ENDPOINT = "http://localhost:4500/";

const socket = socketIO(ENDPOINT, {
  transports: ["websocket"],
});
function operate() {
  let msg = document.querySelector(".textingInput textarea").value;
  msg = msg.replace(/\n/g, "<br>");
  console.clear();
  console.log(msg);
  socket.emit("sendMessage", { msg });
  add_sentMessage(msg);
  document.querySelector(".textingInput textarea").value = "";
}

function add_user() {
  let newuser = document.createElement("li");
  newuser.innerHTML = "New Contact";
  document.getElementById("Contacts").append(newuser);
}

function add_sentMessage(message) {
  let newsent = document.createElement("div");
  newsent.className = "message";
  newsent.id = "Me";
  // newsent.innerHTML = document.getElementById("message").innerHTML;
  newsent.innerHTML = message;
  let messfoot = document.createElement("div");
  messfoot.className = "messageFooter";
  messfoot.innerHTML = "Me";
  newsent.append(messfoot);
  document.getElementById("mainWindow").append(newsent);
}

function Chat() {
  useEffect(() => {
    socket.on(() => {
      console.clear();
      console.log("socket connected");
    });
    socket.emit("join", User);
    socket.on("getMessage", (message) => {
      console.log(message);
    });
  }, [socket]);

  // Manages the dynamic height of the textarea
  const manage = (e) => {
    e.target.style.height = "inherit";
    // e.target.style.height = `${e.target.scrollHeight}px`;
    let limit = 100;
    e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };
  return (
    <>
      <div className="ChattingPage">
        <div className="userPanel">
          <div className="Header">
            {User[0]}'s Contacts
            <input type="text" placeholder="Search Contacts.." />
            <button type="button" onClick={add_user}>
              addnew
            </button>
          </div>
          <div className="mainWindow">
            <ul id="Contacts"></ul>
          </div>
        </div>
        <div className="messageWindow">
          <div className="Header">{User[0]}</div>
          <div className="mainWindow" id="mainWindow"></div>
          <div className="textingInput">
            <textarea
              name="inputArea"
              id="inpArea"
              onKeyDown={manage}
            ></textarea>
            <button onClick={operate}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
