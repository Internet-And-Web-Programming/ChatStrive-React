import React from "react";
import socketIO from "socket.io-client";
import { useEffect } from "react";
import { User } from "../Register/Register";

const ENDPOINT = "http://localhost:4500/";
function Chat() {
  const socket = socketIO(ENDPOINT, {
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.on(() => {
      console.clear();
      console.warn("socket connected");
    });
    socket.emit("join", { User });
  }, [socket]);

  return (
    <>
      <div className="ChattingPage">
        <div className="userPanel">
          <div className="Header">{User}</div>
          <div className="mainWindow"></div>
        </div>
        <div className="massageWindow">
          <div className="Header"></div>
          <div className="mainWindow"></div>
          <div className="textingInput">
            <input type="text" placeholder="Type your message" />
            <button>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
