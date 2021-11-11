import React from "react";
import socketIO from "socket.io-client";
import { useEffect, useState } from "react";
import { User } from "../Register/Register";
import "./chatApp.css";

const ENDPOINT = "http://localhost:4500/";

const socket = socketIO(ENDPOINT, {
  transports: ["websocket"],
});
function operate() {
  let msg = document.querySelector(".textingInput input").value;
  console.clear();
  console.log(msg);
  socket.emit("sendMessage", { msg });
  // Add the message to the chat window
  // addMessage(msg);
}

// function addMessage(msg) {
//   let chatWindow = document.querySelector(".chatWindow");
//   let newMessage = document.createElement("p");
//   newMessage.innerHTML = msg;
//   chatWindow.appendChild(newMessage);
// }

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
  const [msgInput, setmsgInput] = useState("");

  return (
    <>
      <div className="ChattingPage">
        <div className="userPanel">
          <div className="Header">{User[0]}</div>
          <div className="mainWindow">
            <div className="message"></div>
          </div>
        </div>
        <div className="messageWindow">
          <div className="Header">{User[0]}</div>
          <div className="mainWindow"></div>
          <div className="textingInput">
            <input type="text" placeholder="Type your message" />
            <button onClick={operate}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
