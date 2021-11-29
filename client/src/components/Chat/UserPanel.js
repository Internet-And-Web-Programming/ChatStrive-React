import { Component } from "react";
import msgHandler from "./msgWindow";
import Connection from "../SocketConnection/Connection";
export class UserPanel extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      tempUser: {
        name: "",
        id: "",
        lastActive: "",
        lastMessage: "",
        lastMessageTime: "0",
      },
    };
    this.conn = new Connection();
  }
  addUser = (user) => {
    this.state.tempUser = {
      name: user.name,
      id: user.id,
      lastActive: "",
      lastMessage: "",
      lastMessageTime: "0",
    };
    let newUsr = document.createElement("button");
    newUsr.classList.add("user");
    newUsr.id = user.id;
    // newUsr.onclick = this.open(user.id);
    newUsr.addEventListener("click", () => {
      this.open(user.id);
    });
    newUsr.innerHTML = `${user.name}`;
    this.state.userList.push(newUsr);
    this.setState({ userList: this.state.userList });
    return this.state.userList;
  };
  updateUser = (user) => {
    // finding the user in the user list
    let userIndex = this.state.userList.findIndex((usr) => usr.id === user.id);
    // if the user is found
    if (userIndex !== -1) {
      // updating the user
      this.state.userList[userIndex].lastActive = user.lastActive;
      this.state.userList[userIndex].lastMessage = user.lastMessage;
      this.state.userList[userIndex].lastMessageTime = user.lastMessageTime;
      // sorting the user list by last message
      for (let i = 0; i < this.state.userList.length; i++) {
        for (let j = 0; j < this.state.userList.length - 1; j++) {
          if (
            parseInt(this.state.userList[j].lastMessageTime) <
            parseInt(this.state.userList[j + 1].lastMessageTime)
          ) {
            let temp = this.state.userList[j];
            this.state.userList[j] = this.state.userList[j + 1];
            this.state.userList[j + 1] = temp;
          }
        }
      }
    }
  };

  open(id) {
    if (document.querySelector(".initialWindow").style.display !== "none") {
      this.conn.emit("open", id);
      document.querySelector(".initialWindow").style.display = "none";
      document.querySelector(".messageWindow").style.display = "flex";
      document.querySelector(".messageWindow").id = id;
      document.querySelector(".messageWindow .Header").innerHTML = id;
      // msgHandler.getMessages(id);
    } else {
      document.querySelector(".messageWindow").id = id;
      document.querySelector(".messageWindow .Header").innerHTML = id;
    }
  }
}
export default UserPanel;
