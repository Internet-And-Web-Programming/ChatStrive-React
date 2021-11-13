import { Component } from "react";
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:4500/";
const socket = socketIO(ENDPOINT, {
  transports: ["websocket"],
});

export class Connection extends Component {
  constructor() {
    super();
    this.socket = socket;
    this.socket.on(() => {
      console.log("connected");
    });
  }
  emit(ID, data) {
    this.socket.emit(ID, data);
  }
  recieve(ID, callback) {
    this.socket.on(ID, callback);
    return callback;
  }
}

export default Connection;
