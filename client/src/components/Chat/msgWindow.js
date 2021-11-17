import React, { Component } from "react";
import Connection from "../SocketConnection/Connection";
import ReactMarkdown from "react-markdown";
import ReactDOM from "react-dom";

export class msgHandler extends Component {
  constructor() {
    let conn = new Connection();
    super();
    this.conn = conn;
    this.state = {
      messages: [
        {
          sender: "",
          message: "",
          time: "",
          reciever: "",
        },
      ],
    };
  }
  send = () => {
    // Message filtering
    let msg = document.querySelector(".textingInput textarea").value;
    msg = msg.trim();
    if (msg != "") {
      msg = msg.replace(/</g, "&lt;");
      msg = msg.replace(/>/g, "&gt;");
      msg = msg.replace(/\//g, "&#47;");
      msg = msg.replace(/\'/g, "&#39;");
      msg = msg.replace(/\"/g, "&quot;");
      msg = msg.replace(/\n/g, "  \n");
      // Message sending
      this.conn.emit("sendMessage", { msg });
      this.add_sendMessage(msg);
    }
    document.querySelector(".textingInput textarea").value = "";
    document.querySelector(".textingInput textarea").style.height = "35px";
    // document.querySelector(".textingInput textarea").focus();
  };
  add_sendMessage = (message) => {
    let newsent = document.createElement("div");
    ReactDOM.render(<ReactMarkdown children={message} />, newsent);
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
  };
}
export default msgHandler;
