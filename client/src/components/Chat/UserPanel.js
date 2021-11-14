import React, { Component } from "react";

export class UserPanel extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
    };
    this.tempUsr = {
      name: "",
      id: "",
      isActive: false,
      lastMessage: "",
      lastMessageTime: "",
      lastMessageType: "",
      lastActive: "",
    };
  }

  addUser = (name, id) => {
    let tempUsr = { ...this.tempUsr };
    tempUsr.name = name;
    tempUsr.id = id;
    this.setState({
      userList: [...this.state.userList, tempUsr],
    });
  };
  removeUser = (id) => {
    this.setState({
      userList: this.state.userList.filter((usr) => usr.id !== id),
    });
  };
  updateUser = (
    id,
    lastMessage,
    lastMessageTime,
    lastMessageType,
    lastActive
  ) => {
    let tempUsr = { ...this.tempUsr };
    tempUsr.id = id;
    tempUsr.lastMessage = lastMessage;
    tempUsr.lastMessageTime = lastMessageTime;
    tempUsr.lastMessageType = lastMessageType;
    tempUsr.lastActive = lastActive;
    this.setState({
      userList: this.state.userList.map((usr) => {
        if (usr.id === id) {
          return tempUsr;
        }
        return usr;
      }),
    });
  };
}

export default UserPanel;
