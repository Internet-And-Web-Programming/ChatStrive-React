import React from "react";
import { useEffect } from "react";
import { User } from "../Register/Register";
import ReactMarkdown from "react-markdown";
import ReactDOM from "react-dom";
import "./chatApp.css";
import Connection from "../SocketConnection/Connection";
import UserPanel from "./UserPanel";
// import { CSSTransitionGroup } from "react-transition-group";
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
  //msg = msg.replace(/\n/g, "<br/>");
  console.clear();
  console.log(msg);
  conn.emit("sendMessage", { msg });
  add_sentMessage(msg);
  document.querySelector(".textingInput textarea").value = "";
}

function askNewUser() {
  document.querySelector(".getContacts").style.display = "flex";
  document.querySelector(".getContacts input").focus();
}
function attempt(event) {
  if (event.keyCode == 13) {
    add_user();
  }
}

function add_user() {
  document.querySelector(".userList").innerHTML = "";
  let user = {
    name: document.querySelector(".getContacts input").value,
    id: "temp",
  };
  let arr = usrPanel.addUser(user);
  for (let i = 1; i <= arr.length; i++) {
    document.querySelector(".userList").appendChild(arr[arr.length - i]);
  }
  document.querySelector(".getContacts input").value = "";
  document.querySelector(".getContacts").style.display = "none";
}

function add_sentMessage(message) {
  let newsent = document.createElement("div");
  ReactDOM.render(
    <ReactMarkdown children={message} />,
    newsent
  )
  //Renders the React markdown into the container newsent. see https://www.npmjs.com/package/react-markdown
  //use npm install react-markdown
  newsent.className = "message";
  newsent.id = "Me";
  //newsent.innerHTML = document.getElementById("message").innerHTML;
  //newsent.innerHTML = message;
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
  document.addEventListener("keydown", (event) => {
    if (event.altKey && event.keyCode == 78) {
      askNewUser();
    }
  });
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
        <div className="getContacts">
          <label>
            <b>Username of the User</b>
          </label>
          <input type="text" placeholder="Enter UserName" onKeyDown={attempt} />
          <button onClick={add_user}>Add</button>
        </div>
        <div className="userPanel">
          <div className="Header">
            {User[0]}'s Contacts
            <button type="button" onClick={askNewUser}>
              addUser
            </button>
          </div>
          <div className="userList"></div>
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
