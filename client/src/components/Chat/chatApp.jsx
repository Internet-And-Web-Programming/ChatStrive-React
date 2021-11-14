import React from "react";
import socketIO from "socket.io-client";
import { useEffect } from "react";
import { User } from "../Register/Register";
import "./chatApp.css";
import Connection from "../SocketConnection/Connection";
import UserPanel from "./UserPanel";

const usrPanel = new UserPanel();
const conn = new Connection();

function operate() {
  let msg = document.querySelector(".textingInput textarea").value;
  // msg = msg.replace(/<\/?[^>]+(>|$)/g, ""); // This will prevent all XSS attacks
  // Preventing XSS attacks
  msg = msg.replace(/</g, "&lt;");
  msg = msg.replace(/>/g, "&gt;");
  msg = msg.replace(/\//g, "&#47;");
  msg = msg.replace(/\'/g, "&#39;");
  msg = msg.replace(/\"/g, "&quot;");
  msg = msg.replace(/\n/g, "<br>");
  console.clear();
  console.log(msg);
  conn.emit("sendMessage", { msg });
  add_sentMessage(msg);
  document.querySelector(".textingInput textarea").value = "";
}

function add_user() {
  let newuser = document.createElement("li");
  newuser.innerHTML = "New Contact";
  let button = document.createElement("button");
  button.className = "Users";
  button.append(newuser);
  document.getElementById("Contacts").append(button);
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
    conn.on();
    // socket.on("getMessage", (message) => {
    //   console.log(message);
    // });
  }, [conn.self]);

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
