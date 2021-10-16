import React from "react";
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:4500/";
const socket = socketIO(ENDPOINT, { transpose: ["websocket"] });

function Chat() {
  socket.on("connect", () => {
    console.log("connected to server");
  });
  return (
    <div>
      <h1>Working</h1>
    </div>
  );
}

export default Chat;
