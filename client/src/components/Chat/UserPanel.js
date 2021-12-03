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
    let conn = new Connection();
    this.conn = conn;
  }
  addUser = (data) => {
    let [UserID, username] = data;
    let targetUser = [];
    console.log("UserID is : -", UserID);
    console.log("username is : -", username);
    // We now have to find the users inside the existing table.
    this.conn.emit("Check_&_Add", data);
    this.conn.recieve("Check_&_Add", (data) => {
      //  We are fetching 3 things i.e UserID, Username, Name;
      if (data !== null) {
        console.log(data);
        this.loadUsers(UserID);
      } else {
        console.log("This Username doesn't exists");
        return null;
      }
    });
  };
  loadUsers = (UserID) => {
    console.log("in loadUsers function");
    this.conn.emit("loadUsers", UserID);
    this.conn.recieve("loadUsers", (data) => {
      this.setState({
        userList: data,
      });
    });
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
